    const { Model, DataTypes } = require("sequelize");
    const sequelize = require("../../bin/dbConnection");

    class Trainees extends Model { }

    Trainees.init(
        {
            traineeId: {
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
            // ... other configurations
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: "trainees",
        }
    );

    module.exports = Trainees;
