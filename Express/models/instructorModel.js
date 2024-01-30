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
    getUserByUserId: async (userId) => {
        try {
            const user = await models.Instructors.findOne({
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

console.log("checl",filteredInstructors)
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
            const user = await models.Instructors.update({
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


    getAllStatistics: async (query) => {
        try {
            const Instructors = await models.Users.findAll({
                where: {
                    instructorId: query.instructorId,
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