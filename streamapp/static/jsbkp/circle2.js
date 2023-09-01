    let circlularProgresst = document.querySelector("#circular-prgress2");
        progressValuet = document.querySelector("#progress-value2");

        let progressStartValuety=1;
            progressEndValuet=60;
            speedt = 20;

    let progresst = setInterval(()=>{
        progressStartValuety++
        progressValuet.textContent = `${progressStartValuety}%`;
        circlularProgresst.style.background = `conic-gradient(rgb(222, 167, 0) ${progressStartValuety * 3.6}deg, white 0deg)`;
        if(progressStartValuety ==  progressEndValuet){
            clearInterval(progresst);
        }
    },speedt);
