const socket = new WebSocket("ws://" + window.location.host + "/notifications");
let clientId = null;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

socket.onopen = function (e) {
    console.log("WebSocket connection established");
    clientId = uuidv4();
    socket.send(clientId);
};

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    const progressNotification = JSON.parse(event.data);
    if (!progressNotification.completed) {
        fillEoloPlantProgress(progressNotification);
    } else {
        if (progressNotification.id == eoloPlantId) {
            eoloPlantId = null;
            document.getElementById("addEoloPlantButton").disabled = false;
        }
        getEoloPlants();
    }

};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};