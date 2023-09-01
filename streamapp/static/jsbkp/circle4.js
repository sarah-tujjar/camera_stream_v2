let circlularProgressq = document.querySelector("#circular-prgress4");
    progressValueq = document.querySelector("#progress-value4");

    let progressStartValueq=0;
        progressEndValueq=parseInt((130/150)*100);
        speedq = 20;

let progressq = setInterval(()=>{
    progressStartValueq++
    progressValueq.textContent = `130`;
    circlularProgressq.style.background = `conic-gradient(rgb(63, 193, 80) ${progressStartValueq * 3.6}deg, white 0deg)`;
    if(progressStartValueq ==  progressEndValueq){
        clearInterval(progressq);
    }
},speedq);
