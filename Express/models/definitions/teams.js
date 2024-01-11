const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Teams extends Model { }
Teams.init({
    teamId: {
        primaryKey: true,
        type: DataTypes.STRING(60),
    },

},
    {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "teams"

    });

module.exports = Teams;




