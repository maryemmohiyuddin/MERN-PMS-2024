const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createUser: async (body, userId) => {
        try {
            const user = await models.Users.create({
                userId,
                ...body
            })
            return {    
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getUserByEmail: async (userId) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getAllUsers: async (role) => {
        try {
            const users = await models.Users.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },

                where: {
                    role: role,

                }




            })
            return {
                response: users,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    deleteUser: async (userId) => {
        try {
            const user = await models.Users.destroy({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateUser: async (body) => {
        try {
            const user = await models.Users.update({
                ...body
            }, {
                where: {

                    userId: body.userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },



    getAllRequests: async () => {
        try {
            const user = await models.Users.findAll({
                where: {
                    isRequested: true,
                    isApproved: false,
                    isBlocked: false
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
            });
            return {
                response: user,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
};