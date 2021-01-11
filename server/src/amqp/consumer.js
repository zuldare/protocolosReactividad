const CONN_URL = 'amqp://guest:guest@localhost';
const consumerQueue = 'eoloplantCreationProgressNotifications';
const eoloPlantService = require('../services/eoloPlantService.js');
const { sendToEoloPlantClient, sendBroadcast } = require('../websocket.js')

const amqp = require('amqplib');

function listen() {
    return amqp.connect(CONN_URL)
        .then(conn => {
            process.once('SIGINT', function () {
                conn.close();
                console.log("Closed broker connection");
            });

            return conn.createChannel()
                .then(ch => {
                    return ch.assertQueue(consumerQueue, { durable: false })
                        .then(() => {
                            return ch.consume(consumerQueue, function (msg) {
                                console.log(" [x] Received '%s'", msg.content.toString());
                                let parsedMessage = JSON.parse(msg.content);
                                return eoloPlantService.update(parsedMessage)
                                    .then(() => {
                                        if (!parsedMessage.completed) {
                                            console.log('Send to plant client');
                                            sendToEoloPlantClient(parsedMessage.id, msg.content.toString());
                                        } else {
                                            console.log('Send broadcast');
                                            sendBroadcast(parsedMessage.id, msg.content.toString());
                                        }
                                        console.log("Succesfully processed message", parsedMessage);
                                    })
                                    .catch(error => console.error("Error processing message", parsedMessage, error));
                            }, { noAck: true }); // Don't send ack because whether it is processed successfully or not, the next message is taken and it is not re-queued
                        });
                })
                .then(() => {
                    console.log(' [*] Waiting for messages. To exit press CTRL+C');
                });
        }).catch(console.warn);
}

module.exports = { listen }