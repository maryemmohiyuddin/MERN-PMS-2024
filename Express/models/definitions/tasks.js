const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Tasks extends Model { }
Tasks.init({
    taskId: {
        primaryKey: true,
        type: DataTypes.STRING(60),
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue:"Pending"
    }

},
    {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "tasks"

    });

module.exports = Tasks;




