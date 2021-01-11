const { Sequelize, DataTypes, Model } = require('sequelize');
const getSequelize = require('../database.js').getSequelize;
const sequelize = getSequelize();

class EoloPlant extends Model { }

EoloPlant.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    planning: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'EoloPlant',
    tableName: 'eoloPlants',
    timestamps: false
});

module.exports = EoloPlant