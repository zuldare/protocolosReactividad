const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const expressWs = require('express-ws')(app);

const db = require('./config/database.js');
const queue = require('./config/queue.js');
const socket = require('./config/socket.js')

async function main (){
    // Init express-websocket
     let wss = expressWs.getWss('/notifications');

     // Init queue
    await queue.initialize(wss);

    // Init sockets
    await socket.initialize(app);

    // Init database
    await db.initialize(app);





    // Init server
    app.listen(3000, () => {
        console.log('Server listening on port 3000!');
    });

    process.on('SIGINT', () => {
        db.disconnect();
        console.log('Process terminated');
        process.exit(0);
    })

}


main();