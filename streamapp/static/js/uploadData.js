
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
   
    // // white list data upload start
    // $('#upload-button').click(function() {
    //     const formData = new FormData();
    //     formData.append('name', document.getElementById('name').value);
    //     formData.append('status', 'white');
    //     formData.append('image', document.getElementById('image').files[0]);
    //     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();  // Get the CSRF token
    //     formData.append('csrfmiddlewaretoken', csrfToken);  // Append CSRF token to the form data
    //    var url = '/uploadEmployee/';  // Define the URL directly
    //     $.ajax({
    //         type: 'POST',
    //         url: url,
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function(response) {
    //             // console.log(response)
    //             $('#response-message').text(response.message);  // Display the response message
    //         }
    //     });
    // });

    // // white list data upload end


    // black list data upload start
        // $('#black-button').click(function() {
        //     // window.myGlobalVar = 1
        //     console.log('saraaaaah',myGlobalVar)
        //     const formData = new FormData();
        //     formData.append('name', document.getElementById('bname').value);
        //     formData.append('status', 'black');
        //     formData.append('image', document.getElementById('bimage').files[0]);
        //     var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();  // Get the CSRF token
        //     formData.append('csrfmiddlewaretoken', csrfToken);  // Append CSRF token to the form data
        //    var url = '/uploadBlack/';  // Define the URL directly
           
        //     $.ajax({
        //         type: 'POST',
        //         url: url,
        //         data: formData,
        //         processData: false,
        //         contentType: false,
        //         success: function(response) {
                    
        //             window.myGlobalVar = 1
        //             console.log(window.myGlobalVar)
        //             $('#blacklist-message').text(response.message);  // Display the response message
        //             setTimeout(function() {
        //                 $("#bname").val('');
        //                 $("#bimage").val('');
        //                 $('#blacklist-message').text('')
        //                 $('#sectionblackModal').modal('hide');
        //             }, 3000);
        //             window.myGlobalVar = 1
        //             console.log(window.myGlobalVar)
        //         }
        //     });
        // });
    
        // black list data upload end
});


//apend notification panel
function appendAndScroll(robot,cam, status, time, date) {
    if(robot == "terminus"){
        robot="Out-Door";
    }else{
        robot="In-Door";
    }
    const notificPanel = document.getElementById("notificPanel");

    const newPTag = document.createElement("p");
    
    newPTag.className = "bodyTitle border-bottoms  p-3 ";
    newPTag.textContent = `${robot} detect ${status} with ${cam} camera at ${time} ${date}`;

    notificPanel.appendChild(newPTag);
    notificPanel.scrollTop = notificPanel.scrollHeight;

}

  
function appendTableRow(robot,imageUrl, dstatus, status, time, date) {


    if(robot == "terminus"){
        robot="Out-Door";
    }else{
        robot="In-Door";
    }
    var table = document.getElementById("terminus_table");
  
    // Create a new table row element
    var newRow = document.createElement("tr");
    newRow.classList.add('centered-cell');
    if(status === "fire" && dstatus == "new"){
        newRow.classList.add('color-changing');
        playaudio(status)   
    }else if(status === "fire" && dstatus == "db"){
            newRow.classList.add('color-changing');
            
    }else if(status === "smoke" && dstatus == "new"){
        console.log("smoke")
        playaudio(status)
    }


    let imageUrls = imageUrl;
    // Set the inner HTML content for the new row
    newRow.innerHTML = `
      <td>${table.rows.length + 1}</td>
      <td>
      <a href="/static/mydetect/${imageUrls}" id="hiddenLink" data-lightbox="models" style="">
       
          <img src="/static/mydetect/${imageUrls}"  class="logimgs rounded-circle" style="width: 45px; height: 45px"/>
          </a>
       
      </td>
      <td>${robot}</td>
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
    // newRow.style.opacity = 0;
    // setTimeout(() => {
    //   newRow.style.opacity = 1;
    // }, 0); // Adding a slight delay to allow the opacity transition to apply
  }
  

  function saveLogsToDatabase(robot, cam, image, status, time, date) {
    const dataToSend = {
        "robot": robot,
        "cam": cam,
        "status": status,
        "image": image,
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


function getLogsdata() {
    $.ajax({
        type: "GET",
        url: "/fetch_logsdata/",  // Replace with your actual URL
        success: function(data) {
            // console.log(data);
            data.forEach(item => {
                appendAndScroll(item.robot, item.cam, item.status, item.Time, item.Date);
                appendTableRow(item.robot,item.image, item.dstatus, item.status, item.Time, item.Date); 
            });
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
}

function getlistdata() {
 
    var tbody = document.querySelector("#whiteblack_table");

    // Clear the existing content of tbody
    tbody.innerHTML = "";
    $.ajax({
        type: "GET",
        url: "/fetch_listdata/",  // Replace with your actual URL
        success: function(data) {
            // console.log(data);
           
            data.forEach(item => {
                appendlistTableRow(item.id,item.path,item.name, item.status)
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
            // console.log(response.message)
            if (response.message === 'Logged out successfully.') {
                window.location.href = '/';  // Redirect to signin page after logout
            }
        }
    });
}


// append black white list 
function appendlistTableRow(id, path,name, status) {

        var table = document.getElementById("whiteblack_table");      
      // Create a new table row element
      var newRow = document.createElement("tr");
      newRow.classList.add('centered-cell');
      var badgeClass = (status === 'white') ? 'bg-success' : 'bg-danger';

    // Set the inner HTML content for the new row
    newRow.innerHTML = `
      <td>${table.rows.length + 1}</td>
      <td>
        <a href="../../media/${path}" data-lightbox="models" data-title="">
          <img src="../../media/${path}" class="rounded-circle" style="width: 45px; height: 45px"/>
        </a>
      </td>
      <td>${name}</td>
      <td> <span id="${id}" class="wbstatus badge p-2 ${badgeClass}">${status}</span></td>
      <td> <img src="/static/qss/del.png"  id="${id}" class="delemployee"/> </td>
  
    `;  
    // Append the new row to the table
    table.appendChild(newRow);
  
    // Scroll the #terminus div to show the new content
    var terminusDiv = document.getElementById("blackwhitelist");
    terminusDiv.scrollTop = terminusDiv.scrollHeight;
  
    // Smoothly show the new row
    newRow.style.opacity = 0;
    setTimeout(() => {
      newRow.style.opacity = 1;
    }, 0); // Adding a slight delay to allow the opacity transition to apply
  }
  