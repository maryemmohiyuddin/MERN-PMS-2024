const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createInstructor: async (body, instructorId) => {
        try {
            console.log(instructorId)
            const instructor = await models.Instructors.create({
                ...body,
                instructorId
            })
            return {
                response: instructor,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getInstructorByemail: async (email) => {
        try {
            const instructor = await models.Instructors.findOne({
                where: {
                    email: email,
                }
            })
            return {
                response: instructor,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getUserByUserId: async (traineeId) => {
        try {
            const user = await models.Trainees.findOne({
                where: {
                    traineeId: traineeId,
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
    getUserByUserId: async (instructorId) => {
        try {
            const instructor = await models.Instructors.findOne({
                where: {
                    instructorId: instructorId,
                }
            })
            return {
                response: instructor,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getInsById: async (query) => {
        try {
            const instructor = await models.Instructors.findOne({
                where: {
                    instructorId: query.instructorId,
                }
            })
            return {
                response: instructor,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getAllInstructors: async (query) => {
        try {
            const notIncluding = await models.Requests.findAll({
                where: {
                    traineeId: query.traineeId,
                    status: "Rejected",
                },
                attributes: ["instructorId"],
            });

            const notIncludingIds = notIncluding.map(item => item.instructorId);

            const allInstructors = await models.Instructors.findAll({
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
            });

            // Filter out instructors with IDs present in notIncludingIds
            const filteredInstructors = allInstructors.filter(instructor =>
                !notIncludingIds.includes(instructor.instructorId)
            );

            console.log("checl", filteredInstructors)
            return {
                response: filteredInstructors,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    deleteUser: async (userId) => {
        try {
            const user = await models.Instructors.destroy({
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
            const instructor = await models.Instructors.update({
                ...body
            }, {
                where: {

                    instructorId: body.instructorId,
                }
            })
            return {
                response: instructor,
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
            console.log("check1")
            const Instructors = await models.Trainees.findAll({
                where: {
                    instuctorId: query.instructorId,
                }
            });
            console.log("inst",Instructors)
            const projects = await models.Projects.findAll({
                where: {
                    instructorId: query.instructorId
                }
            });
            console.log("inst", projects)

            const assignedProjects = await models.Projects.findAll({
                where: {
                    projectTag: 'Assigned',
                    instructorId: query.instructorId
                }
            });
            console.log("inst", assignedProjects)

            const unassignedProjects = await models.Projects.findAll({
                where: {
                    projectTag: 'Unassigned',
                    instructorId: query.instructorId
                }
            });
            console.log("inst", unassignedProjects)

            const teams = await models.Teams.findAll({
                where: {
                    instructorId: query.instructorId
                }
            });

            console.log("inst", teams)

            const userCount = Instructors.length;
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
            const user = await models.Instructors.findAll({
                where: {
                    isRequested: true,
                    isApproved: false,
                    isBlocked: false,
                    instructorId: query.instructorId
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