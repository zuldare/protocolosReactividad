const app = require('./app.js');
const database = require('./database.js');
const consumer = require('./amqp/consumer.js');

database.connect()
    .then(() => consumer.listen())
    .then(() => {
        app.listen(3000, () => {
            console.log('Server listening on port 3000!');
        });
    });

process.on('SIGINT', () => {
    database.disconnect();
    console.log('Process terminated');
    process.exit(0);
});