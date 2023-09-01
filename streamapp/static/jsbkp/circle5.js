let circlularProgressqty = document.querySelector("#circular-prgress5");
    progressValueqty = document.querySelector("#progress-value5");

    let progressStartValueqty=0;
        progressEndValueqty=parseInt((20/150)*100);
        speedqty = 20;

let progressqty = setInterval(()=>{
    progressStartValueqty++
    progressValueqty.textContent = `20`;
    circlularProgressqty.style.background = `conic-gradient(rgb(252, 196, 34) ${progressStartValueqty * 3.6}deg, white 0deg)`;
    if(progressStartValueqty ==  progressEndValueqty){
        clearInterval(progressqty);
    }
},speedqty);
