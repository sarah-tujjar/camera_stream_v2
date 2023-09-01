document.addEventListener("DOMContentLoaded", function() {
  


});
let previousId = null;
$('.motoLogo').on('click',function() {
    console.log('read')
    const url = '/static/js/sara.json?v=' + Date.now();
    fetch(url)
    .then(response => response.json())
    .then(data => {
       
            data.forEach(item => {
                
                if (item.id !== previousId) {
                   
                    if(item.status === "fire"){
                        console.log("fire")
                        playaudio(item.status)
                    }else if(item.status === "smoke"){
                        console.log("smoke")
                        playaudio(item.status)
                    }
                    appendAndScroll(item.robot, item.cam,item.status, item.Time, item.Date);
                    appendTableRow(item.robot,item.image, item.status, item.Time, item.Date);
                    saveLogsToDatabase(item.robot, item.cam,item.image, item.status, item.Time, item.Date)
                    previousId = item.id;
                }
                
            });
      

    })
    .catch(error => {
        console.error("Error loading or parsing JSON:", error);
    });
});


//read data from json file
// const url ='static/js/sara.json';

// fetch(url)
// .then(response => response.json())
// .then(data => {
//     data.forEach(item => {
//         // console.log(item.id);
//         appendAndScroll(item.robot, item.cam,item.status, item.Time, item.Date);
//         appendTableRow(item.robot,item.image, item.status, item.Time, item.Date);   
     
        
//     });
   
       
  
// })
// .catch(error => {
//     console.error("Error loading or parsing JSON:", error);
// });