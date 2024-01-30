const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Requests extends Model { }

Requests.init(
    {
        requestId: {
            primaryKey: true,
            type: DataTypes.STRING(1000),
        },
       
        status: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            defaultValue: "Pending",
        },
       
   
    },
    {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "requests",
    }
);

module.exports = Requests;
