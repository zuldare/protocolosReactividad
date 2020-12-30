const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://guest:guest@localhost';
const plantCreationQueue = 'eoloplantCreationRequests';
const notificationQueue = 'eoloplantCreationProgressNotifications';

let createPlantChannel = null;
let notificationChannel = null;

process.on('exit', (code) => {
    createPlantChannel.close();
    console.log(`Closing rabbitmq channel`);
});

async function initialize(wss) {

    amqp.connect(CONN_URL, async function (err, conn) {

        // CREATE PLANT CHANNEL
        createPlantChannel = await conn.createChannel(function(error, channel) {
            if (error) {
                console.error("Error creating chanel 'createPlantChannel' " + error);
                throw error;
            }
            channel.assertQueue(plantCreationQueue, { durable: false });
        });

        // CREATE NOTIFICATION CHANNEL AND CONSUME
        notificationChannel = await conn.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }
            channel.assertQueue(notificationQueue, { durable: false  });

            channel.consume(notificationQueue, function (msg) {
                    console.log('Notification message: ', msg.content.toString());
                    ews.clients.forEach(function (client) {
                        console.log('Client:' + client);
                        client.send(msg.content.toString());
                    });
                }, { noAck: true }
            );
        });
    });
}


const sendMessage = (message) => {
    console.log("publishToQueue: '" + message + "'");
    createPlantChannel.sendToQueue(plantCreationQueue, Buffer.from(message));
};

module.exports.initialize = initialize;
module.exports.sendMessage = sendMessage;