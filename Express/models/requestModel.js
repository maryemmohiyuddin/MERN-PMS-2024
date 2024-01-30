const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    submitRequest: async (body, requestId) => {
        try {
            const request = await models.Requests.create({
                ...body,
                requestId
            })
            return {
                response: request,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getRequest: async (query) => {
        try {
            const request = await models.Requests.findOne({
                where: {
                    traineeId: query.traineeId,
                    status: query.status
                }
            })
            return {
                response: request,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getUserByUserId: async (userId) => {
        try {
            const user = await models.Trainees.findOne({
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

    getUserById: async (query) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: query.userId,
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
    getAllUsers: async (query) => {
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

                    instructorId: query.instructorId,
                    role: query.role,
                    isBlocked: false,
                    isApproved: true

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
    updateRequest: async (body) => {
        try {
            // const request = await models.Requests.update({
            //     status: "Approved"
            // }, {
            //     where: {
            //         traineeId: body.traineeId,
            //         instructorId: body.instructorId
            //     }
            // })
            // console.log("status", request)
            if (body.status == "Approved") {
                const [rowCount, [updatedUser]] = await models.Trainees.update(
                    {
                        instructorId:body.instructorId            
                            },
                    {
                        where: {
                            traineeId: body.traineeId,
                        },
                        returning: true, // Add this option to return the updated rows
                    }
                );

                console.log("Number of rows affected:", rowCount);
                console.log("Updated User:", updatedUser);
                }

            return {
                response: request,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },


    getAllStatistics: async (query) => {
        try {
            const users = await models.Users.findAll({
                where: {
                    instructorId: query.instructorId,
                    isBlocked: false,
                    isApproved: true
                }
            });
            const projects = await models.Projects.findAll({
                where: {
                    instructorId: query.instructorId
                }
            });
            const assignedProjects = await models.Projects.findAll({
                where: {
                    projectTag: 'Assigned',
                    instructorId: query.instructorId
                }
            });
            const unassignedProjects = await models.Projects.findAll({
                where: {
                    projectTag: 'Unassigned',
                    instructorId: query.instructorId
                }
            });
            const teams = await models.Teams.findAll({
                where: {
                    instructorId: query.instructorId
                }
            });

            const userCount = users.length;
            const projectCount = projects.length;
            const teamCount = teams.length;
            const asProjects = assignedProjects.length;
            const unasProjects = unassignedProjects.length;


            return {
                response: {

                    userCount,
                    projectCount,
                    teamCount,
                    asProjects,
                    unasProjects
                },
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllRequests: async (query) => {
        try {
            const requests = await models.Requests.findAll({
                where: {
                    instructorId: query.instructorId,
                    status: "Pending"
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
            });

            // Initialize an array to store user details
            const userDetails = [];

            // Loop through each request and fetch user details
            for (const request of requests) {
                const user = await models.Trainees.findOne({
                    where: {
                        traineeId: request.traineeId,
                        isBlocked: false
                    },
                    attributes: ["firstName", "lastName", "email"], // Include the attributes you need
                });

                // If user is found, push their details to the array
                if (user) {
                    userDetails.push({
                        firstName: user.firstName,
                        lastName: user.lastName,

                        email: user.email,
                        traineeId: request.traineeId,
                    });
                }
            }

            return {
                response: userDetails,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },


};