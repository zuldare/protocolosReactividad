const database = require('./database.js');

async function main(){

    console.log("======> Starting app");
    await database.connect();

    app.listen(3000, () => {
        console.log("\n\n=======> Server listening on port 3000!!!!");
    });

    process.on('SIGINT', () => {
        database.disconnect();
        console.log('=======> Process terminated');
        process.exit(0);
    });
}

main();