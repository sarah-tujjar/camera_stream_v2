
ctrfblk = $("#tfblock").text();
trfblk = document.querySelector("#tfblock");

let trfblkStartValue = 0;
speed = 100;
let prog = setInterval(()=>{
    trfblkStartValue++
    trfblk.textContent = `${trfblkStartValue}`;
    
    if(trfblkStartValue ==  ctrfblk){
        clearInterval(prog);
    }
},speed);



// Restric Area
crestblk = $("#restric").text();
restblk = document.querySelector("#restric");

let restStartValue = 0;
speeds = 100;
let pro = setInterval(()=>{
    restStartValue++
    restblk.textContent = `${restStartValue}`;
    
    if(restStartValue ==  crestblk){
        clearInterval(pro);
    }
},speeds);