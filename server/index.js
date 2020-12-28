const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/database.js');

app.use(bodyParser.json());

async function main (){
    await db.initialize(app);

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