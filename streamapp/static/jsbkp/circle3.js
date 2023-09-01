let circlularProgressq = document.querySelector("#circular-prgress3");
    progressValueq = document.querySelector("#progress-value3");

    let progressStartValueq=0;
        progressEndValueq=80;
        speedq = 20;

let progressq = setInterval(()=>{
    progressStartValueq++
    progressValueq.textContent = `${progressStartValueq}%`;
    circlularProgressq.style.background = `conic-gradient(rgb(200, 35, 51) ${progressStartValueq * 3.6}deg, white 0deg)`;
    if(progressStartValueq ==  progressEndValueq){
        clearInterval(progressq);
    }
},speedq);
