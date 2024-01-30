const { off } = require("../app");
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createSession: async (sessionId, token, userId,userType) => {
        try {
            let session;

            if (userType === "trainee") {
                session = await models.Sessions.create({
                    sessionId: sessionId,
                    traineeId: userId,
                    token: token,
                });
            } else if (userType === "instructor") {
                session = await models.Sessions.create({
                    sessionId: sessionId,
                    instructorId: userId,
                    token: token,
                });
            }

            return {
                response: session,
            };
        } 

         catch (error) {
            return {
                error: error,
            };
        }

    },
    getSessionByUserId: async (userId, userType) => {
        try {
            let session;

            if (userType === "trainee") {
                session = await models.Sessions.findOne({
                    where: {
                        traineeId: userId,
                    }
                });
            } else if (userType === "instructor") {
                session = await models.Sessions.findOne({
                    where: {
                        instructorId: userId,
                    }
                });
            }

            return {
                response: session,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getSession: async (userId, token) => {
        try {
            const session = await models.Sessions.findOne({

                where: {
                    userId: userId,
                    token: token
                }


            })
            return {
                response: session,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    deleteSession: async (userId,userType) => {
        try {
            let session;

            if (userType === "trainee") {
                session = await models.Sessions.destroy({
                    where: {
                        traineeId: userId,
                    }
                });
            } else if (userType === "instructor") {
                session = await models.Sessions.destroy({
                    where: {
                        instructorId: userId,
                    }
                });
            }

            return {
                response: session,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

};