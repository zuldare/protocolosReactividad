module.exports = (sequelize, Model, DataTypes) => {

    class Plant extends Model {};

    return Plant.init({
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false
        },
        progress:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        completed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        planning:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },  { sequelize, modelName: 'plant' })
}