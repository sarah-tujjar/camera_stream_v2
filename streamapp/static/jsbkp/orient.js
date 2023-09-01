// MQTT setup
const mqttClient = mqtt.connect("ws://192.168.100.140:9001"); // Add your broker URL
const orionstarData=document.getElementById("orion_data");

// Step 1: Send start topic to robot
const startPayload = {
  "appName": "com.zorabots.streaming.webrtc",
  "extras": {
    "twoWay": false,
    "audioEnabled": false
  }
};
mqttClient.publish('zbos/remote/kiosk/apps/start', JSON.stringify(startPayload));

// Step 2: Subscribe to init topic
mqttClient.subscribe('zbos/camera/stream/init');
mqttClient.subscribe('zbos/slam/location/current/response/qss2030');

// Step 3: Get user device stream
const constraints = {
  audio: true,
  video: false  // Can replace with 'this.startAsTwoWay' if needed
};

navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    // Step 4: Start RTCPeerConnection
    const configuration = {
      "iceServers": [{
        "urls": [
          "turn:turn.zorabots.be:3478?transport=udp",
          "turn:turn.zorabots.be:3478?transport=tcp"
        ],
        "credential": "cyiW83fe7pm2klDQXt55",
        "username": "zbos"
      }]
    };
    const localPeer = new RTCPeerConnection(configuration);

    stream.getTracks().forEach(track => {
      localPeer.addTrack(track, stream);
    });

    // Step 5: Setup candidate topics
    localPeer.onicecandidate = evt => {
      if (!evt.candidate) return;
      const candidatePayload = {
        type: 'candidate',
        label: evt.candidate.sdpMLineIndex,
        id: evt.candidate.sdpMid,
        candidate: evt.candidate.candidate
      };

      mqttClient.publish('zbos/camera/stream/candidate/control', JSON.stringify(candidatePayload));
    };

    mqttClient.subscribe('zbos/camera/stream/candidate/core');
    const mapPayload = {
      "key": "qss2030"
    };
    const getRobotLocation='zbos/slam/location/current/get';
    publishEvery5Seconds(getRobotLocation, mapPayload);

    mqttClient.on('message', (topic, message) => {
      if (topic === 'zbos/camera/stream/candidate/core') {
        const data = JSON.parse(message.toString());
        const candidate = new RTCIceCandidate({
          candidate: data.candidate,
          sdpMid: data.id,
          sdpMLineIndex: data.label
        });
        localPeer.addIceCandidate(candidate);
      } else if (topic === 'zbos/camera/stream/answer') {
        const data = JSON.parse(message.toString());
        localPeer.setRemoteDescription(new RTCSessionDescription(data));
      }
      else if (topic === 'zbos/slam/location/current/response/qss2030') {
        const mapdata = JSON.parse(message.toString());
        // console.log(mapdata);
        const now = new Date();
        const currentDate = now.toLocaleDateString(); // Get the current date in the format "MM/DD/YYYY"
        const currentTime = now.toLocaleTimeString();
        // $('#orion_data').text(`T: ${now}x:${mapdata.x} y:${mapdata.x} :: Baring-> ${mapdata.rotation}`)

        $('#date').text(currentTime)
        $('#time').text(currentDate)
        $('#status').text('None')
        $('#xcord').text(`${mapdata.x}`)
        $('#ycord').text(mapdata.y)
        $('#baring').text(mapdata.rotation)
        // orionstarData.text(mapdata)
      }
    });

    // Step 6: Wait for ontrack event
    localPeer.ontrack = evt => {
      const stream = evt.streams[0];
      // console.log(stream);
      const videoElement = document.getElementById('video');
      videoElement.srcObject = stream;
    };

    // Step 7: Create offer
    localPeer.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: true })
      .then(offer => localPeer.setLocalDescription(offer))
      .then(() => {
        const offerPayload = JSON.stringify(localPeer.localDescription);
        mqttClient.publish('zbos/camera/stream/offer', offerPayload);
      });
  });

// Step 8: Subscribe to answer topic
mqttClient.subscribe('zbos/camera/stream/answer');


function publishEvery5Seconds(topic, payload) {
  setInterval(() => {
      mqttClient.publish(topic, JSON.stringify(payload));
  }, 100); // 5000 milliseconds = 5 seconds
}