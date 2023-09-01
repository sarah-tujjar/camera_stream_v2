// var previousMessage = "";
// function pollForMessage() {
//     $.ajax({
//         url: "/get_mqtt_message/",  // URL to your Django view for checking messages
//         method: "GET",
//         success: function(data) {
//             // const messageContainer = $("#message-container");
//             // messageContainer.append(`<p>${data.message}</p>`);  // Update HTML content
//             if (data.message !== previousMessage) {
//                 console.log("Received MQTT message:", data.message);
//                 showSuccessAlert(data.message) 
//                 previousMessage = data.message;  // Update the previous message
//             }
//             pollForMessage(); 
//         },
//         error: function() {
//             pollForMessage();  
//         },
//         timeout: 3000  
//     });
// }

// $(document).ready(function() {
//     pollForMessage();  // Start polling when the page loads
// });


// function showSuccessAlert(message, imageUrl) {
//     const alertElement = document.createElement('div');
//     alertElement.classList.add('alert');
    
//     // Create an image element and set its attributes
//     const imageElement = document.createElement('img');
//     imageElement.src = '../static/alert.png';
//     imageElement.alt = 'Success Image';
    
//     // Create a div for message content
//     const messageDiv = document.createElement('span');
//     messageDiv.textContent = message;
    
//     // Append image and message content to the alert element
//     alertElement.appendChild(imageElement);
//     alertElement.appendChild(messageDiv);
    
//     const alertContainer = document.getElementById('alertContainer');
//     alertContainer.appendChild(alertElement);     
//     $(alertElement).fadeIn(400);
    
//     setTimeout(() => {
//         $(alertElement).fadeOut(400, () => {
//             alertElement.remove();
//         });
//     }, 3000);
// }