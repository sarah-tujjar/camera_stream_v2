class ZoraBotsWebRTC {
    constructor(robotId) {
        this.robotId = robotId;
        this.localPeer = null;
        const options = {
            clientId: 'mqttjs_5hthfsty',
            username: 'c-dc78de52-a2e9-4eec-a19f-1812294d78f2',
            password: 'c68c51e8-8048-46bb-aee3-e2b193a74f10',
        };
        this.mqttClient = mqtt.connect('ws://mqtt.zorabots.be:9001/mqtt', options);
        this.mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
        // Step 1: Send start topic to robot
        this.startStream();
        // Step 2: subscribe to init topic and start connection after receiving response
        this.subscribe(`push/${this.robotId}/camera/stream/init`, (message) => {
            // Once the response from the init topic is received, you can proceed with the next steps.
            // this.setupWebRTC();
        });
        this.setupWebRTC();
    }
    startStream() {
        const topic = `zbos/${this.robotId}/remote/kiosk/apps/start`;
        const payload = {
            "appName": "com.zorabots.streaming.webrtc",
            "extras": {
                "twoWay": false,
                "audioEnabled": false
            }
        };
        this.publish(topic, JSON.stringify(payload));
    }
    setupWebRTC() {
        console.log("entered setupWebRTC")
        // Step 3: Get the user device stream
        const constraints = {
            audio: true,
            video: false // Adjust this value as needed
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                // Step 4: Start RTCPeerConnection
                this.setupRTCPeerConnection(stream);
                // Step 5: Setup candidate topics
                this.setupCandidateTopics();
                // Step 6: wait for localPeer ontrack event and use video element to show stream
                this.setupOnTrack();
                // Step 7: create offer and send offer topic to robot
                this.createAndSendOffer();
                // Step 8: Subscribe to answer topic and setRemoteDescription
                this.subscribeToAnswer();
            })
            .catch(err => {
                console.error('Error getting media', err);
            });
    }
    setupRTCPeerConnection(stream) {
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
        this.localPeer = new RTCPeerConnection(configuration);
        stream.getTracks().forEach(track => {
            this.localPeer.addTrack(track, stream);
        });
    }
    setupCandidateTopics() {
        this.localPeer.onicecandidate = (evt) => {
            if (evt.candidate) { // Check if candidate exists
                const candidate = evt.candidate;
                const object = {
                    type: 'candidate',
                    label: candidate.sdpMLineIndex,
                    id: candidate.sdpMid,
                    candidate: candidate.candidate
                };
                const topic = `zbos/${this.robotId}/camera/stream/candidate/control`;
                this.publish(topic, JSON.stringify(object));
            }
        };
        const topic = `push/${this.robotId}/camera/stream/candidate/core`;
        this.subscribe(topic, (message) => {
            const data = JSON.parse(message.payload.toString());
            const candidate = new RTCIceCandidate({
                candidate: data.candidate,
                sdpMid: data.id,
                sdpMLineIndex: data.label
            });
            this.localPeer.addIceCandidate(candidate);
        });
    }
    setupOnTrack() {
        this.localPeer.ontrack = (evt) => {
            const stream = evt.streams[0]; // robot camera stream
            const videoElement = document.getElementById('video');
            videoElement.srcObject = stream;
        };
    }
    createAndSendOffer() {
        const constraints = {
            offerToReceiveAudio: false,
            offerToReceiveVideo: true
        };
        this.localPeer.createOffer(constraints).then((offer) => {
            return this.localPeer.setLocalDescription(offer);
        }).then(() => {
            const description = this.localPeer.localDescription;
            const topic = `zbos/${this.robotId}/camera/stream/offer`;
            this.publish(topic, JSON.stringify(description));
        }).catch(error => {
            console.error('Offer Creation Error:', error);
        });
    }
    subscribeToAnswer() {
        const topic = `push/${this.robotId}/camera/stream/answer`;
        this.subscribe(topic, (message) => {
            const data = JSON.parse(message.payload.toString());
            this.localPeer.setRemoteDescription(new RTCSessionDescription(data))
                .catch(error => {
                    console.error('Failed to set Remote Description:', error);
                });
        });
    }
    publish(topic, message) {
        this.mqttClient.publish(topic, message, {}, (error) => {
            if (error) {
                console.error('MQTT Publish Error:', error);
            } else {
                console.log(`Published to ${topic}:`, message);
            }
        });
    }
    subscribe(topic, callback) {
        this.mqttClient.subscribe(topic, (error) => {
            if (error) {
                console.error('MQTT Subscribe Error:', error);
            } else {
                console.log(`Subscribed to ${topic}`);
            }
        });
        this.mqttClient.on('message', (receivedTopic, message) => {
            console.log(`Message received from ${receivedTopic}:`);
            if (receivedTopic === topic) {
                console.log(`Message received from ${receivedTopic}:`, message.toString());
                callback({ payload: message });
            }
        });
    }
}
// Assuming you have an MQTT client connection already established:
// Instantiate the class
new ZoraBotsWebRTC('MC1BHWE010022414U80C');
// new ZoraBotsWebRTC('CAG013UBT10000006');