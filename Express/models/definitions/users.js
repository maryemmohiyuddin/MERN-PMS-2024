const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

const jwt = require("jsonwebtoken");
const config = require("../../config/config.json");
const { v4: uuidV4 } = require("uuid");
const session = require("./sessions");

class Users extends Model { }

Users.init(
    {
        userId: {
            primaryKey: true,
            type: DataTypes.STRING(60),
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
        role: {
            type: DataTypes.STRING(),
            allowNull: false,

        },

        isRequested: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        cohort: {
            type: DataTypes.STRING(),
            defaultValue: "Cohort-4 evening",

        },
        stack: {
            type: DataTypes.STRING(),
            defaultValue: "MERN",
        },
    },
    {
        hooks: {
            afterCreate: async (Users) => {
                delete Users.dataValues.password;
                const token = jwt.sign(Users.dataValues, config.jwt.secret, {
                    expiresIn: "1h",
                });
                await session.create({
                    userId: Users.dataValues.userId,
                    token,
                    sessionId: uuidV4(),
                });
            },
        },
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "users",
    }
);

module.exports = Users;
