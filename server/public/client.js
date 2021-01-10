let socket = new WebSocket("ws://" + window.location.host + "/plantNotifications");
const baseUrlPath = "http://localhost:3000/eolicplants";
const topographyUrlPath = "http://localhost:8080/api/topographicdetails/cityLandscapes";
let plantsCreated = [];
let availableCitiesCreated = [];



socket.onopen = function (e) {
    console.log("WebSocket connection established");
};

socket.onmessage = function (event) {
    let plant = JSON.parse(event.data);
    console.log(`Message from socket: ${plant}`);
    updateProgress(plant);
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