const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Sessions extends Model { }
Sessions.init({

    sessionId: {
        primaryKey: true,
        type: DataTypes.STRING(3000),
    },
    token: {
        type: DataTypes.STRING(3000),
        unique: true,
        allowNull: false,

    },

},
    {
        sequelize,
        modelName: "sessions"

    });

module.exports = Sessions;




