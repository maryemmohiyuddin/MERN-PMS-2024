const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

const jwt = require("jsonwebtoken");
const config = require("../../config/config.json");
const { v4: uuidV4 } = require("uuid");
const session = require("./sessions");

class Instructors extends Model { }

Instructors.init(
    {
        instructorId: {
            primaryKey: true,
            type: DataTypes.STRING(1000),
        },
        firstName: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(60),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    },
    {
        hooks: {
            afterCreate: async (Instructors) => {
                delete Instructors.dataValues.password;
                const token = jwt.sign(Instructors.dataValues, config.jwt.secret, {
                    expiresIn: "1h",
                });
                await session.create({
                    userId: Instructors.dataValues.userId,
                    token,
                    sessionId: uuidV4(),
                });
            },
        },
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "instructors",
    }
);

module.exports = Instructors;
