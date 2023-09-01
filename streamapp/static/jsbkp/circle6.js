let circlularProgressqtyz = document.querySelector("#circular-prgress6");
    progressValueqtyz = document.querySelector("#progress-value6");

    let progressStartValueqtyz=0;
        progressEndValueqtyz=parseInt((60/100)*100);
        speedqtyz = 20;

let progressqtyz = setInterval(()=>{
    progressStartValueqtyz++
    progressValueqtyz.textContent = `60`;
    circlularProgressqtyz.style.background = `conic-gradient(rgb(0, 134, 206) ${progressStartValueqtyz * 3.6}deg, white 0deg)`;
    if(progressStartValueqtyz ==  progressEndValueqtyz){
        clearInterval(progressqtyz);
    }
},speedqtyz);
