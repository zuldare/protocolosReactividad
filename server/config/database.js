const mysql = require('mysql2/promise');
const {Sequelize, Model, DataTypes} = require("sequelize");
const plantModel = require('../models/plantModel.js');
const plantRoute = require('../routes/plantRoute.js')
let conn;

async function initialize(app){
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pass'
        });
        console.log("=> Connected to MySQL");


        // Create ddbb
        console.log("=> Drop & Create database 'eolicplants' if not exists.");
        await conn.execute('DROP DATABASE IF EXISTS eolicplants;');
        await conn.execute('CREATE DATABASE IF NOT EXISTS eolicplants;');

        // Connect to ddbb
        console.log("=> Connecting to database");
        const sequelize = new Sequelize('eolicplants', "root", "pass", {dialect: 'mysql'});

        // Sequelize > models
        console.log("=> Initialize models and export them");
        let plant = await plantModel(sequelize, Model, DataTypes);

        // Plant routes
        plantRoute(app, plant);

        // Synchro model with ddbb
        console.log("Synchronize models with database");
        await sequelize.sync();
    } catch (e) {
        console.log("ERROR initializing database. ERROR: " + e);
    }

}

async function disconnect(){
    await conn.close();
    console.log("====> Database connection closed")
}

module.exports = {initialize, disconnect}

