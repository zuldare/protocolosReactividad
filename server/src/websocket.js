const webSocketsMap = new Map();
const eoloPlantsClientsLinkMap = new Map();
const OPEN = 1;

function webSocketHandler(ws, req) {

    console.log('Client connected');

    ws.on('message', function (msg) {
        console.log('Message received:' + msg);
        if (!webSocketsMap.has(msg)) {
            webSocketsMap.set(msg, ws);
        }
    });

}

function sendToEoloPlantClient(eoloPlantId, msg) {
    if (eoloPlantsClientsLinkMap.has(eoloPlantId)) {
        const clientId = eoloPlantsClientsLinkMap.get(eoloPlantId);
        if (webSocketsMap.has(clientId)) {
            send(clientId, msg);
        }
    }
}

function sendBroadcast(eoloPlantId, msg) {
    const iterator = webSocketsMap.keys();
    let key = iterator.next();
    while (!key.done) {
        send(key.value, msg);
        key = iterator.next();
    }
    eoloPlantsClientsLinkMap.delete(eoloPlantId);
}

function send(clientId, msg) {
    let ws = webSocketsMap.get(clientId);
    if (ws.readyState === OPEN) {
        ws.send(msg);
    } else {
        webSocketsMap.delete(clientId);
    }
}

function linkEoloPlantToClient(clientId, eoloPlantId) {
    if (!eoloPlantsClientsLinkMap.has(eoloPlantId)) {
        eoloPlantsClientsLinkMap.set(eoloPlantId, clientId);
    }
}

module.exports = { webSocketHandler, sendToEoloPlantClient, sendBroadcast, linkEoloPlantToClient }