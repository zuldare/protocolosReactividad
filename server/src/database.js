const { Sequelize } = require('sequelize');

let sequelize;

function getSequelize() {
    if (!sequelize) {
        sequelize = new Sequelize('eoloplants', 'root', 'pass', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }
    return sequelize;
}

function connect() {

    sequelize = getSequelize();

    return sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
            sequelize.sync({ force: true })
                .then(() => console.log("All models were synchronized successfully."));
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });

}

function disconnect() {
    return sequelize.close()
        .then(console.log("Closed database connection"))
        .catch((err) => {
            console.error("Error closing connection to database: ", err);
        });
}

module.exports = { getSequelize, connect, disconnect }