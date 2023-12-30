const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class TeamMembers extends Model { }
TeamMembers.init({
    teamMemberId: {
        primaryKey: true,
        type: DataTypes.STRING(60),
    },

},
    {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "teamMembers"

    });

module.exports = TeamMembers;




