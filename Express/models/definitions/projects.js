const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Projects extends Model { }
Projects.init({
    projectId: {
        primaryKey: true,
        type: DataTypes.STRING(60),
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },

    projectTag: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    projectStarting: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
    },
    projectEnding: {
        type: DataTypes.DATEONLY(),
        allowNull: false,

    },
    status: {
        type: DataTypes.STRING(),

    },
},
    {
        sequelize,
        timestamps: true,
        paranoid: false,
        modelName: "projects"

    });

module.exports = Projects;




