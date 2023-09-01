let circlularProgress = document.querySelector(".circular-prgress");
    progressValue = document.querySelector(".progress-value");

    let progressStartValue=0;
        progressEndValue=100;
        speed = 20;

let progress = setInterval(()=>{
    progressStartValue++
    progressValue.textContent = `${progressStartValue}%`;
    circlularProgress.style.background = `conic-gradient(indigo ${progressStartValue * 3.6}deg, white 0deg)`;
    if(progressStartValue ==  progressEndValue){
        clearInterval(progress);
    }
},speed);
