import cv2
from django.http import HttpResponse, FileResponse, JsonResponse
from django.views.decorators import gzip
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from ultralytics import YOLO
import base64
import numpy as np
import os
import face_recognition
from django.db import connection, OperationalError
import uuid
from django.conf import settings
import json
from django.contrib import messages
from .decorators import login_required
import pygame
from ultralytics.yolo.utils.plotting import Annotator
import time
from threading import Thread
import threading
import sys
import torch
import requests


# Constants
PATH_TO_JOIN = 'streamapp/static/mydetect'

# Global variables
image_counter = 0
current_id = 0
results_list = []
sent_ids = set()
prev_face_name = ''
prev_time = time.time()
last_sent_time = {}
ckpt = torch.load("models/fireSmoke.pt")  # Adjust this path if needed
torch.save(ckpt, "models/updated-fireSmoke.pt")
model = YOLO("models/updated-fireSmoke.pt")
threads_lock = threading.Lock()

class_colors = {"fire": (255, 0, 0), "smoke": (0, 255, 0)}

def Smoke_API():

    api_url = "https://patrol.robot.tslsmart.com/apiRequest"
    headers = {
        "Authorization": "9c6126dc2eb64a39a4f26c",
        "Content-Type": "application/json"
    }

    response = requests.post(api_url, headers=headers, json={
        "version": "1.0.0",
        "key": "9c6126dc2eb64a38aa9b32d59a4df26c",
        "module": "walk",
        "function": "getRobotStatus",
        "requestId": "ASssQWE123456",
        "param": {
        "robotId": "21WV332035"
        }
    })

    if response.status_code == 200:
        data = response.json()
        smoke = data['param']['smoke']
        return smoke
        
    else:
        print("API request failed")
        return None

def load_faces_from_db():
    
    query = """
        SELECT * FROM employee
    """

    with connection.cursor() as cursor:
        
            cursor.execute(query)
            data = cursor.fetchall()
            if not data:
                return None, None, None, None
            path_to_join = "media"
            images = [
                cv2.imread(os.path.join(path_to_join, row[2]))
                for row in data
                if cv2.imread(os.path.join(path_to_join, row[2])) is not None
            ]  # Ensure we only append non-None images
            names = [row[1].upper() for row in data]
            statuses = {row[1].upper(): row[3] for row in data}
            print(names)
            encodings = []
            for img in images:
                current_face_encodings = face_recognition.face_encodings(img)
                
                if len(current_face_encodings) > 0:
                    encodings.append(current_face_encodings[0])
                else:
                    encodings.append(None)

            return images, names, statuses, encodings

images, faces_names, statuses, encodings = load_faces_from_db()

@csrf_exempt
@gzip.gzip_page
def patrol(request):
    
    global results_list, sent_ids, last_sent_time
    # , final_result, last_sent_time
    
    
    # Check request method 
    if request.method != 'POST':
        print("Request is not POST. Exiting.")
        return JsonResponse({'status': 'Only POST method is allowed'}, status=400)
        
    frames_list = request.POST.getlist('frame[]')  # assuming the frames are sent as a list
    decoded_frames = [] 
    for frame_data in frames_list:
        image_data = base64.b64decode(frame_data.split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        decoded_frames.append(frame)

    back, left, right, front, orien = decoded_frames
    with threads_lock:
        threads = []
        for frame, name in zip([back, left, right, front, orien], ['Back', 'Left', 'Right', 'Front', 'Orien']):

            thread = Thread(target=process_video, args=(frame, name))
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()
            
        current_time = time.time()
        for result in results_list:
            robot_name = result['robot']
            
            if robot_name in last_sent_time and (current_time - last_sent_time[robot_name]) < 5:
                continue
            # Update the last sent time for the robot
            last_sent_time[robot_name] = current_time
            print(result)
            if result['id'] not in sent_ids:
                sent_ids.add(result['id'])
                return JsonResponse({'detected_objects': result})
                # current_result_time = result[-1]['time']
                # if current_result_time != last_sent_time:
                #     last_sent_time = current_result_time  # Update the last_sent_time
                #     return JsonResponse({'detected_objects': result[-1]})
            
        
    results_list=[]
    return JsonResponse({'message': 'No new detected objects.'})
   
def process_video(frame, name):

    global results_list

    if frame is None:
        return
    # Process detected objects and save results
    process_detected_objects(frame, name)
    
    # Process detected faces and save results
    process_detected_faces(frame, name)

    # if final_result:
    #      results_list.append(final_result)
    #      print(results_list)

def save_image(frame):
    global image_counter

    current_time_str = time.strftime("%Y%m%d_%H%M%S")
    image_name = f"{image_counter}_{current_time_str}.jpg"
    image_path = os.path.join(PATH_TO_JOIN, image_name)
    cv2.imwrite(image_path, frame)
    image_counter += 1
    return image_name

def process_detected_objects(frame, frame_name):
    global current_id, results_list, prev_time

    current_time = time.time()
    detected_labels = set()

    results = model.predict(frame, conf=0.70)
    annotator = Annotator(frame)

    for r in results:
        for box in r.boxes:
            class_id = r.names[box.cls[0].item()]
            confidence = box.conf.item()
            detected_labels.add(class_id)
            b = box.xyxy[0]
            label = f"{model.names[int(box.cls.item())]} {confidence:.2f}"
        
            annotator.box_label(b, label)
        print(detected_labels)
        if detected_labels:
            # if "smoke" in detected_labels and frame_name != 'Orien':
            #     smoke_check = Smoke_API()
            #     if smoke_check == 1:
            #         for label in detected_labels:
            #             image_name = save_image(frame)
            #             results_list.append(create_detection_result(current_id, label, image_name, frame_name))
            #             current_id += 1
            # else:
                for label in detected_labels:
                    image_name = save_image(frame)
                    results_list.append(create_detection_result(current_id, label, image_name, frame_name))
                    current_id += 1

        # if detected_labels:
        #     for label in detected_labels:
        #         image_name = save_image(frame)
        #         results_list.append(create_detection_result(current_id, label, image_name, frame_name))
        #         current_id += 1

def process_detected_faces(frame, frame_name):
    global current_id, last_unknown_time

    # current_time = int(time.time())

    face_name = find_faces(frame)
    print(face_name)
    if face_name is not None:
        if face_name != 'Unknown':
            process_known_face(face_name, frame, frame_name)
        # elif face_name == 'Unknown':
        #     # current_time = current_time % 60
        #     # last_unknown_time = last_unknown_time % 60
        #     print(current_time , last_unknown_time)
        #     if float(number_format(current_time, 1)) - float(number_format(last_unknown_time,1 )) > 5:
        #         print(number_format(current_time,1) , number_format(last_unknown_time,1 ))
        #         # print(current_time )
        #         process_unknown_face(face_name, frame)
        #         last_unknown_time = int(time.time())

def process_known_face(face_name, frame, frame_name):
    global prev_face_name, current_id, results_list

    if face_name != prev_face_name:
        status = get_face_status(face_name, statuses)
        prev_face_name = face_name
        image_name = save_image(frame)
        results_list.append(create_detection_result(current_id, status, image_name, frame_name))
        current_id += 1
        print('dsklfjsdjgfdghjkfdg', results_list)

def find_faces(frame):
    global encodings
    
    imgS = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    faceCurentFrame = face_recognition.face_locations(imgS)
    if not faceCurentFrame:  # No faces detected
        return None
    
    encodeCurentFrame = face_recognition.face_encodings(imgS, faceCurentFrame)

    for encodeface, faceLoc in zip(encodeCurentFrame, faceCurentFrame):
        matches = face_recognition.compare_faces(encodings, encodeface, 0.5)
        faceDis = face_recognition.face_distance(encodings, encodeface)

        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = faces_names[matchIndex].upper()
            # print(name)
            return name
    return "Unknown"

def get_face_status(name, statuses):
    if name in statuses:
        return statuses[name]
    else:
        return "Name not found in statuses"

def process_unknown_face(face_name, frame):
    global image_counter, current_id, results_list

    image_name = save_image(frame)
    results_list.append(create_detection_result(current_id, face_name, image_name))

    current_id += 1
    print(results_list)

def create_detection_result(det_id, status, image_name, frame_name):
    robot = ''
    if frame_name != 'Orien':
        robot = "terminus"
    else: 
        robot = frame_name

    return {
        'id': det_id,
        'robot': robot,
        'cam': "Front",
        'status': status,
        'image': image_name,
        "dstatus": "new",
        "date": time.strftime("%Y-%m-%d"),
        "time": time.strftime("%H:%M:%S")
    }

def signin(request):
    return render(request, "signin.html")


@login_required
def index(request):
    user_id = request.session.get("user_id")
    # print("User ID:", user_id)
    return render(request, "index.html")


def play_alert_audio(request):
    # print('m going to play')
    audio_file_path = "aramcoapp/static/audio/1.mp3"
    return FileResponse(open(audio_file_path, "rb"), content_type="audio/mpeg")

# upload white list
def uploadEmployee(request):

    global images, faces_names, statuses, encodings 

    with threads_lock:
        if request.method == "POST":
            
            name = request.POST.get("name")
            image = request.FILES.get("image")
            status = request.POST.get("status")
            # Check if name already exists in the faces_names list
            if name.upper() in faces_names:
                return JsonResponse({"message": "Name already exists."})
            if name and image and status:
                # Generate a unique filename for the uploaded image
                file_extension = os.path.splitext(image.name)[-1]
                image_filename = f"employee_{uuid.uuid4().hex}{file_extension}"

                # Construct the image path within the media folder
                image_path = os.path.join("employee_images", image_filename)

                # Save the image in the media folder
                with open(os.path.join(settings.MEDIA_ROOT, image_path), "wb") as f:
                    for chunk in image.chunks():
                        f.write(chunk)

                # Insert data into the database
                with connection.cursor() as cursor:
                    sql_query = (
                        "INSERT INTO employee (name, path, status) VALUES (%s, %s, %s)"
                    )
                    cursor.execute(sql_query, [name, image_path, status])
                    
                    # Only load the newly added employee data to the global variables
                    path_to_join = "media"
                    new_image = cv2.imread(os.path.join(path_to_join, image_path))
                    
                    if new_image is not None:
                        images.append(new_image)
                        names = name.upper()
                        faces_names.append(names)
                        statuses[names] = status

                        current_face_encodings = face_recognition.face_encodings(new_image)
                        if len(current_face_encodings) > 0:
                            encodings.append(current_face_encodings[0])
                        else:
                            encodings.append(None)
                        print(faces_names, statuses)
                    connection.commit()                     
            
                response_message = "White List updated successfully.."
            else:
                response_message = "Missing required data."

            return JsonResponse({"message": response_message})

        return JsonResponse({"message": "Invalid request method."})

# uload black list data
def uploadBlack(request):
   
    global images, faces_names, statuses, encodings
    with threads_lock:
        if request.method == "POST":
            name = request.POST.get("name")
            image = request.FILES.get("image")
            status = request.POST.get("status")
            # Check if name already exists in the faces_names list
            if name.upper() in faces_names:
                return JsonResponse({"message": "Name already exists."})
            if name and image and status:
                # Generate a unique filename for the uploaded image
                file_extension = os.path.splitext(image.name)[-1]
                image_filename = f"employee_{uuid.uuid4().hex}{file_extension}"

                # Construct the image path within the media folder
                image_path = os.path.join("employee_images", image_filename)

                # Save the image in the media folder
                with open(os.path.join(settings.MEDIA_ROOT, image_path), "wb") as f:
                    for chunk in image.chunks():
                        f.write(chunk)

                # Insert data into the database
                with connection.cursor() as cursor:
                    sql_query = (
                        "INSERT INTO employee (name, path, status) VALUES (%s, %s, %s)"
                    )
                    cursor.execute(sql_query, [name, image_path, status])
                    # Only load the newly added employee data to the global variables
                    path_to_join = "media"
                    new_image = cv2.imread(os.path.join(path_to_join, image_path))
                    
                    if new_image is not None:
                        images.append(new_image)
                        names = name.upper()
                        faces_names.append(names)
                        statuses[names] = status

                        current_face_encodings = face_recognition.face_encodings(new_image)
                        if len(current_face_encodings) > 0:
                            encodings.append(current_face_encodings[0])
                        else:
                            encodings.append(None)
                        print(faces_names, statuses)

                    connection.commit()
                response_message = "Black List updated successfully."

            else:
                response_message = "Missing required data."
            return JsonResponse({"message": response_message})
        
        return JsonResponse({"message": "Invalid request method."})

def restart_program():
    """Restarts the current program."""
    os.execv(sys.executable, ['python'] + sys.argv)

# save logs data
@csrf_exempt
def save_logsdata_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print('datdatdatdatdtadt', data)
            # Assuming you have a database table named 'logs_data'
            # Adjust the table name and column names accordingly
            query = """
                INSERT INTO logs (robot, cam, status,image, Time, Date)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            values = (
                data["robot"],
                data["cam"],
                data["status"],
                data["image"],
                data["Time"],
                data["Date"],
            )

            with connection.cursor() as cursor:
                cursor.execute(query, values)
                data = {}
            return JsonResponse({"message": "Data saved successfully."})
        except json.JSONDecodeError as e:
            return JsonResponse({"message": "Invalid JSON data."}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method."}, status=400)

# get logs data
def fetch_logsdata_view(request):
    if request.method == "GET":
        query = """
            SELECT * FROM logs
        """

        with connection.cursor() as cursor:
            try:
                cursor.execute(query)
            except Exception as e:
                return JsonResponse(
                    {"message": f"Error executing query: {e}"}, status=500
                )

            data = cursor.fetchall()

            # Check if data is available
            if not data:
                return JsonResponse([], safe=False)

            # Get column names from cursor description
            column_names = [col[0] for col in cursor.description]

            # Convert data to list of dictionaries
            data_as_dicts = [dict(zip(column_names, row)) for row in data]

            return JsonResponse(data_as_dicts, safe=False)
    else:
        return JsonResponse({"message": "Invalid request method."}, status=400)


def signin_user(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        if email and password:
            # Check if the email and password match a user in the database
            with connection.cursor() as cursor:
                sql_query = "SELECT * FROM users WHERE email = %s AND password = %s"
                cursor.execute(sql_query, [email, password])
                user_data = cursor.fetchone()

                if user_data:
                    # Store user data in the session
                    request.session["user_id"] = user_data[0]
                    request.session["email"] = user_data[1]
                    messages.success(request, "Logged in successfully.")
                    # print(request.session['user_id'])
                    return JsonResponse(
                        {"message": "Logged in successfully.", "user_id": user_data[0]}
                    )
                else:
                    return JsonResponse({"message": "Incorrect Email & Password."})
        else:
            return JsonResponse({"message": "Missing required data."})

# logout
def logout_user(request):
    if request.method == "POST":
        # Clear the session data

        request.session.clear()

        return JsonResponse({"message": "Logged out successfully."})


# play audio function
def play_audio(request):
    status = request.GET.get("status", "")

    audio_filename = f"{status}.mp3"
    # print(audio_filename)
    audio_path = os.path.join("streamapp", "static", "audio", audio_filename)

    # Initialize the pygame mixer
    pygame.mixer.init()

    # Load and play the audio file
    pygame.mixer.music.load(audio_path)
    pygame.mixer.music.play()

    return HttpResponse("Audio played successfully")


try:
    connection.ensure_connection()
    # print("Database connection is active.")
except OperationalError:
    print("Database connection is not active.")

# del employee
def delemp(request, employee_id):
    global faces_names, images, statuses, encodings
    if request.method == "DELETE":
        with connection.cursor() as cursor:
            # First, retrieve the image_name for the given employee_id
            select_query = "SELECT name, path FROM `employee` WHERE id = %s"
            cursor.execute(select_query, [employee_id])
            result = cursor.fetchone()

            # Check if a record was found
            if result:
                employee_name= result[0]
                image_name = result[1]
                print(image_name)
                path_to_join = 'media'
                image_path = os.path.join(path_to_join, image_name)        

                # Check if the file exists, and then delete
                if os.path.exists(image_path):
                    os.remove(image_path)
                    print('image Deleted')
            else: 
                print('image not found')
            sql_query = "DELETE FROM `employee` WHERE id = %s"
            cursor.execute(sql_query, [employee_id])
            rows_deleted = cursor.rowcount
            try:
                    index_to_remove = faces_names.index(employee_name.upper())
                    del faces_names[index_to_remove]
                    del images[index_to_remove]
                    del encodings[index_to_remove]
                    statuses.pop(employee_name.upper(), None)
                    print(faces_names, statuses)
            except ValueError:
                    # If employee_name is not found in names, it's already been removed or never existed.
                    pass

        if rows_deleted == 1:
            return JsonResponse({"message": "Employee deleted successfully."})
        else:
            return JsonResponse({"message": "Employee not found."})
    else:
        return JsonResponse({"message": "Invalid request method."})


# update the status of employee
@csrf_exempt
def updwbstatus(request, employee_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            new_status = data.get("newStatus")
            # if new_status not in ['Black', 'White']:
            #     return JsonResponse({'message': 'Invalid new status provided.'}, status=400)

            with connection.cursor() as cursor:
                # First, get the name of the employee

                select_query = "SELECT name FROM `employee` WHERE id = %s"
                cursor.execute(select_query, [employee_id])
                result = cursor.fetchone()

                # Check if the employee was found
                if not result:
                    return JsonResponse({"message": "Employee not found."})
                
                employee_name = result[0].upper()


                sql_query = "UPDATE employee SET status = %s WHERE id = %s"
                cursor.execute(sql_query, [new_status, employee_id])
                rows_updated = cursor.rowcount
            # Update the status in the statuses dictionary
            global statuses
            statuses[employee_name] = new_status
            print(statuses)

            if rows_updated == 1:
                return JsonResponse(
                    {"message": "Employee status updated successfully."}
                )
            else:
                return JsonResponse({"message": "Employee not found."})
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data provided."}, status=400)
        except Exception as e:
            return JsonResponse(
                {"message": "An error occurred.", "error": str(e)}, status=500
            )
    else:
        return JsonResponse({"message": "Invalid request method."})

# get listdata data
def fetch_listdata_view(request):
    if request.method == "GET":
        query = """
            SELECT * FROM employee
        """

        with connection.cursor() as cursor:
            try:
                cursor.execute(query)
            except Exception as e:
                return JsonResponse(
                    {"message": f"Error executing query: {e}"}, status=500
                )

            data = cursor.fetchall()

            # Check if data is available
            if not data:
                return JsonResponse([], safe=False)

            # Get column names from cursor description
            column_names = [col[0] for col in cursor.description]

            # Convert data to list of dictionaries
            data_as_dicts = [dict(zip(column_names, row)) for row in data]

            return JsonResponse(data_as_dicts, safe=False)
    else:
        return JsonResponse({"message": "Invalid request method."}, status=400)


# not used 

# def number_format(num, places=0):
#     return locale.format_string("%.*f", (places, num), True)