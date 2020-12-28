module.exports = (sequelize, Model, DataTypes) => {

    class Plant extends Model {};

    Plant.init({
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
            default: 0
        },
        completed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        planning:{
            type: DataTypes.STRING
        }
    },  { sequelize, modelName: 'plant' })
}