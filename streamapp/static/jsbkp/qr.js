function scanQr(){
    let scanner = new Instascan.Scanner({ video: document.getElementById('WorkingArea')});
    Instascan.Camera.getCameras().then(function(cameras){
        if(cameras.length > 0){
            scanner.start(cameras[0]);
        }else{
            alert('no camera found');
        }
    }).catch(function(e){
        console.error(e)
    });

    scanner.addListener('scan', function(c){
        document.getElementById('qrtext').value = c;

    });
}

