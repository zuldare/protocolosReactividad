const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const eoloPlantsRouter = require('./routes/eoloPlantRouter.js');
const webSocketHandler = require('./websocket.js').webSocketHandler;

app.use(express.static('public'));

//Convert json bodies to JavaScript object
app.use(express.json());
app.use('/api/eoloplants', eoloPlantsRouter);

app.ws('/notifications', webSocketHandler)

module.exports = app