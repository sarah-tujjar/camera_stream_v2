
displayStreams();
async function fetchUrls() {
    const api_url = "https://patrol.robot.tslsmart.com/apiRequest";
    const headers = {
        "Authorization": "9c6126dc2eb64a39a4f26c",
        "Content-Type": "application/json"
    };

    const requestBody = {
        "version": "1.0.0",
        "key": "9c6126dc2eb64a38aa9b32d59a4df26c",
        "module": "video",
        "function": "getCameraUrl",
        "requestId": "ASssQWE123456",
        "param": {
            "robotId": "21WV332037"
        }
    };

    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (response.status === 200) {
            const data = await response.json();
            const param = data.param || {};
            const left_url = param.leftUrl;
            const front_url = param.frontUrl;
            const right_url = param.rightUrl;
            const back_url = param.backUrl;
            return [left_url, front_url, right_url, back_url];
        } else {
            console.log("API request failed");
            return [null, null, null, null];
        }
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return [null, null, null, null];
    }
}
function removePortFromUrl(url) {
    return url.replace(/:(\d+)/, '');
}
// Example usage:
    async function displayStreams() {
        const [leftUrl, frontUrl, rightUrl, backUrl] = await fetchUrls();

        if (flvjs.isSupported()) {
            const leftPlayer = flvjs.createPlayer({
                type: 'flv',
                url: leftUrl
            });
            leftPlayer.attachMediaElement(document.getElementById('leftVideo'));
            leftPlayer.load();

            const frontPlayer = flvjs.createPlayer({
                type: 'flv',
                url: frontUrl
            });
            frontPlayer.attachMediaElement(document.getElementById('frontVideo'));
            frontPlayer.load();

            const rightPlayer = flvjs.createPlayer({
                type: 'flv',
                url: rightUrl
            });
            
            rightPlayer.attachMediaElement(document.getElementById('rightVideo'));
            rightPlayer.load();

            const backPlayer = flvjs.createPlayer({
                type: 'flv',
                url: backUrl
            });
            backPlayer.attachMediaElement(document.getElementById('backVideo'));
            backPlayer.load();

        } else {
            console.error('FLV is not supported in this browser.');
        }
    }
