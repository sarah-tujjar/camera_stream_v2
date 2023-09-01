$(document).ready(function() {
    // getMQTTMessage();
    // signin start

    $('#signin-button').click(function() {
    
        const formData = new FormData();
        formData.append('email', document.getElementById('email').value);
        formData.append('password', document.getElementById('pass').value);
        const userId= document.getElementById('email').value
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();  // Get the CSRF token
        formData.append('csrfmiddlewaretoken', csrfToken);  // Append CSRF token to the form data
       var url = '/signin_user/';  // Define the URL directly
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response)
                if (response.message === "Logged in successfully.") {
                    console.log("User ID:", response.user_id);
                    window.location.href = "home/";  // Redirect to index page on success
                } else {
                    $('#response-message').text(response.message);  // Display error message
                }
            }
        });
    });

    // signin end
   
    // white list data upload start
    $('#upload-button').click(function() {
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('status', 'white');
        formData.append('image', document.getElementById('image').files[0]);
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();  // Get the CSRF token
        formData.append('csrfmiddlewaretoken', csrfToken);  // Append CSRF token to the form data
       var url = '/uploadEmployee/';  // Define the URL directly
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // console.log(response)
                $('#response-message').text(response.message);  // Display the response message
            }
        });
    });

    // white list data upload end


    // black list data upload start
        $('#black-button').click(function() {
           
            const formData = new FormData();
            formData.append('name', document.getElementById('bname').value);
            formData.append('status', 'black');
            formData.append('image', document.getElementById('bimage').files[0]);
            // console.log(formData.get('name'))
            // console.log(formData.get('status'))
            // console.log(formData.get('image'))
            var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();  // Get the CSRF token
            formData.append('csrfmiddlewaretoken', csrfToken);  // Append CSRF token to the form data
           var url = '/uploadBlack/';  // Define the URL directly
            $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    // console.log(response)
                    $('#blacklist-message').text(response.message);  // Display the response message
                    setTimeout(function() {
                        $("#bname").val('');
                        $("#bimage").val('');
                        $('#blacklist-message').text('')
                        $('#sectionblackModal').modal('hide');
                    }, 3000);
                }
            });
        });
    
        // black list data upload end
});



// var previousResponse = '';
// function getMQTTMessage() {
//     $.ajax({
//       url: '/get_mqtt_message/',
//       success: function(response) {
//     //     var response = JSON.parse(response); // Parse the response as JSON
//     //     console.log(response);
//     //    if (response.status !== previousResponse) {
//     //       console.log(response.status);
//     //       appendTableRow(response.image, response.status,response.Time, response.Date);
//     //       previousResponse = response.status; // Update the previous response
//     //     }  
//     try {
//         var parsedResponse = JSON.parse(response); // Try parsing the response as JSON
        
//         if (typeof parsedResponse === "object" && parsedResponse !== null) {
//           // This is valid JSON response
//           if (parsedResponse.status !== previousResponse) {
//             console.log(parsedResponse.status);
//             appendTableRow(parsedResponse.image, parsedResponse.status, parsedResponse.Time, parsedResponse.Date);
//             previousResponse = parsedResponse.status; // Update the previous response
//           }
//         } else {
//           // This might be valid JSON but not in object form (e.g., JSON array)
//           console.log("Valid JSON response but not an object:", parsedResponse);
//         }
//       } catch (error) {
//         // This is not valid JSON response
//         console.error("Error parsing JSON:", error);
//         console.log("Non-JSON response:", response);
//       }  

//       },
//       complete: function() {
//         getMQTTMessage(); // Make the next request after completing the previous one
//       }
//     });
//   }


//apend notification panel
function appendAndScroll(robot,cam, status, time, date) {
    if(robot == "terminus"){
        robot="Out-Door";
    }else{
        robot="In-Door";
    }
    const notificPanel = document.getElementById("notificPanel");

    const newPTag = document.createElement("p");
    
    newPTag.className = "bodyTitle camborder p-3 my-1 ";
    newPTag.textContent = `${robot} detect ${status} with ${cam} camera at ${time} ${date}`;

    notificPanel.appendChild(newPTag);
    notificPanel.scrollTop = notificPanel.scrollHeight;

}

  
function appendTableRow(robot,imageUrl, status, time, date) {


    if(robot == "terminus"){
        var table = document.getElementById("terminus_table");
    }else{
        var table = document.getElementById("OrionStar_table");
    }
    
  
    // Create a new table row element
    var newRow = document.createElement("tr");
    newRow.classList.add('centered-cell');
    if(status === "fire"){
        newRow.classList.add('color-changing');
        playaudio(status)
    }else if(status === "smoke"){
        console.log("smoke")
        playaudio(status)
    }

    let imageUrls = imageUrl.substring(imageUrl.indexOf('static'));
    // Set the inner HTML content for the new row
    newRow.innerHTML = `
      <td>${table.rows.length + 1}</td>
      <td>
      <a href="/${imageUrls}" id="hiddenLink" data-lightbox="models" style="">
       
          <img src="/${imageUrls}"  class="logimgs rounded-circle" style="width: 45px; height: 45px"/>
          </a>
       
      </td>
      <td>${status}</td>
      <td>${time}</td>
      <td>${date}</td>
    `;
  
    // Append the new row to the table
    table.appendChild(newRow);
  
    // Scroll the #terminus div to show the new content
    var terminusDiv = document.getElementById("terminus");
    terminusDiv.scrollTop = terminusDiv.scrollHeight;
  
    // Smoothly show the new row
    newRow.style.opacity = 0;
    setTimeout(() => {
      newRow.style.opacity = 1;
    }, 0); // Adding a slight delay to allow the opacity transition to apply
  }
  

  function saveLogsToDatabase(robot, cam, image, status, time, date) {
    const dataToSend = {
        "robot": robot,
        "cam": cam,
        "image": image,
        "status": status,
        "Time": time,
        "Date": date
    };

    console.log("Data to send:", dataToSend); // Debugging statement

    $.ajax({
        type: "POST",
        url: "/save_logsdata/", // Replace with your actual URL
        data: JSON.stringify(dataToSend), // Stringify the data
        contentType: "application/json",  // Set the content type
        dataType: "json",
        success: function(response) {
            console.log("Data saved successfully:", response.message);
        },
        error: function(error) {
            console.error("Error saving data:", error);
        }
    });
}

function readSarafile(){
    
    const url = '/static/js/sara.json?v=' + Date.now();
    fetch(url)
    .then(response => response.json())
    .then(data => {
       
            data.forEach(item => {
                if (item.id !== previousId) {
                    console.log('new notification');
                    appendAndScroll(item.robot, item.cam,item.status, item.Time, item.Date);
                    appendTableRow(item.robot,item.image, item.status, item.Time, item.Date);
                    previousId = item.id;
                }
                
            });  
           
      

    })
    .catch(error => {
        console.error("Error loading or parsing JSON:", error);
    });
}
function getLogsdata() {
    $.ajax({
        type: "GET",
        url: "/fetch_logsdata/",  // Replace with your actual URL
        success: function(data) {
            // console.log(data);
            data.forEach(item => {
                appendAndScroll(item.robot, item.cam, item.status, item.Time, item.Date);
                appendTableRow(item.robot,item.image, item.status, item.Time, item.Date); 
            });
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
}


// logout
function logout(){
    const url = '/logout/';  // URL for the logout view
    
    $.ajax({
        type: 'POST',
        url: url,
        data: {'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()},
        success: function(response) {
            console.log(response.message)
            if (response.message === 'Logged out successfully.') {
                window.location.href = '/';  // Redirect to signin page after logout
            }
        }
    });
}
