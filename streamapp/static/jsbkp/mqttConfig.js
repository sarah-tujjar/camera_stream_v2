
startConnect();

function startConnect(){

    clientID = "clientID - "+parseInt(Math.random() * 100);

    host = "broker.emqx.io";   
    port = 8083;  

    console.log(`Connecting to " + ${host} + "on port " +${port}`);
    client = new Paho.MQTT.Client(host,Number(port),clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect
    });


}


function onConnect(){
    topic =  "smartcity";
    console.log(`Subscribing to topic ${topic}`);
    client.subscribe(topic);
}



function onConnectionLost(responseObject){
    console.log(`ERROR: Connection is lost.`);
    if(responseObject !=0){

        console.log(`ERROR: ${responseObject.errorMessage}`);
    }
}

function onMessageArrived(message){
    
    var obj  = JSON.parse((message.payloadString));

    if(obj.title == 'start'){
       var vich = document.getElementById("vichlesPage");
      // alert()
      vich.click();
    }



}

function startDisconnect(){
    client.disconnect();
    console.log(`Disconnected`);
}


// function publishMessage(vmsg){
//     msg = vmsg;
//     topic = "roshan2";

//     Message = new Paho.MQTT.Message(msg);
//     Message.destinationName = topic;

//     client.send(Message);
//     console.log('publish');
    


// }