const CONN_URL = 'amqp://guest:guest@localhost';
const queue = 'eoloplantCreationRequests';
const amqp = require('amqplib');

function publishToQueue(data) {
    return amqp.connect(CONN_URL)
        .then(conn => {
            return conn.createChannel();
        })
        .then(channel => {
            return channel.assertQueue(queue, { durable: false })
                .then(() => {
                    return channel.sendToQueue(queue, Buffer.from(data));
                });
        })
        .catch(console.warn);
}

module.exports = publishToQueue