const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const Projects = require("./projects.js");

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
        paranoid: false,
        modelName: "teams"

    });

module.exports = Teams;




