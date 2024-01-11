const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createUser: async (body, userId) => {
        try {
            const user = await models.Users.create({
               ...body,
               userId
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
    getUserByemail: async (email) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    email: email,
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
    getAllUsers: async ( query) => {
        try {
            // console.log("model", offset, query)

            const users = await models.Users.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
                // where: [
                //     {
                //         ...(query.firstName
                //             ? { firstName: { [Op.substring]: query.firstName } }
                //             : true),
                //     },
                //     {
                //         ...(query.lastName
                //             ? { lastName: { [Op.substring]: query.lastName } }
                //             : true),
                //     },
                //     {
                //         ...(query.email
                //             ? { email: { [Op.substring]: query.email } }
                //             : true),
                //     },
                //     {
                //         ...(query.role ? { role: { [Op.in]: [query.role] } } : true),
                //     },
                // ],
                // order: [[query.sortValue, query.sortOrder]],
                // offset: offset,
                // limit: query.limit,
               where:{ 
                
                instructorId:query.instructorId,
                role: query.role

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
    getAllInstructors: async (query) => {
        try {
            // console.log("model", offset, query)

            const users = await models.Users.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
                // where: [
                //     {
                //         ...(query.firstName
                //             ? { firstName: { [Op.substring]: query.firstName } }
                //             : true),
                //     },
                //     {
                //         ...(query.lastName
                //             ? { lastName: { [Op.substring]: query.lastName } }
                //             : true),
                //     },
                //     {
                //         ...(query.email
                //             ? { email: { [Op.substring]: query.email } }
                //             : true),
                //     },
                //     {
                //         ...(query.role ? { role: { [Op.in]: [query.role] } } : true),
                //     },
                // ],
                // order: [[query.sortValue, query.sortOrder]],
                // offset: offset,
                // limit: query.limit,
                where: {

                    role: query.role

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



    getAllRequests: async (query) => {
        try {
            const user = await models.Users.findAll({
                where: {
                    isRequested: true,
                    isApproved: false,
                    isBlocked: false,
                    instructorId:query.instructorId
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