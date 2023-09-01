var emergency = document.getElementById("emergency");
emergency.addEventListener('click', function(){
  fetch('/emergency/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(text => {
        
        console.log(text)
        console.log("emergency function is done")
        
        
      })
  .catch(error => console.error(error));

})


// function getImages(){
//     fetch('/getimages/')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.text();
//       })
//       .then(text => {
            
//             console.log(text)
//             console.log("snapshotButton process is start")
//             for (let i = 0; i < 4; i++) {
//               let img = document.getElementById(`img${i}`);
//               let imglink = document.getElementById(`imglink${i}`);
//               if (img) {
//                 img.onload = function() {
//                   console.log(`Image ${i} loaded successfully`);
//                 }
//                 img.src = `/static/snapshots/snapshot_${i}.jpg?t=${Date.now()}`;
//                 imglink.href=`/static/snapshots/snapshot_${i}.jpg?t=${Date.now()}`;
//               } else {
//                 console.log(`Image ${i} not found`);
//               }
//             }
//             console.log("land function going to triger");
//           //  land();
//           })
//       .catch(error => console.error(error));
      
//   }







