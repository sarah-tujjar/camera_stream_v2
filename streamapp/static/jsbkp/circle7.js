let circlularProgressqtyb = document.querySelector("#circular-prgress7");
    progressValueqtyb = document.querySelector("#progress-value7");

    let progressStartValueqtyb=0;
        progressEndValueqtyb=parseInt((40/100)*100);
        speedqtyb = 20;

let progressqtyb = setInterval(()=>{
    progressStartValueqtyb++
    progressValueqtyb.textContent = `40`;
    circlularProgressqtyb.style.background = `conic-gradient(rgb(132, 124, 203) ${progressStartValueqtyb * 3.6}deg, white 0deg)`;
    if(progressStartValueqtyb ==  progressEndValueqtyb){
        clearInterval(progressqtyb);
    }
},speedqtyb);
