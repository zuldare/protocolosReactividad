const mysql = require('mysql2/promise');
const {Sequelize, Model, DataTypes} = require("sequelize");
const plantModel = require('../models/plant.js');
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
        plantModel(sequelize, Model, DataTypes);

        // Synchro model with ddbb
        console.log("Synchronize models with database");
        await sequelize.sync();
    } catch (e) {
        console.log("ERROR initializing database. ERROR: " + e);
    }

}

module.exports.initialize = initialize;

