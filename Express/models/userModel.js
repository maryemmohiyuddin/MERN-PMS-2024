const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createUser: async (body, userId) => {
        try {
            const user = await models.Trainees.create({
                ...body,
                traineeId: userId
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
            const user = await models.Trainees.findOne({
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

    getUserById: async (query) => {
        try {
            const user = await models.Trainees.findOne({
                where: {
                    traineeId: query.traineeId,
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

            const users = await models.Trainees.findAll({
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

                    instuctorId: query.instructorId,



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

            const user = await models.Trainees.update({
                ...body
            }, {
                where: {

                    traineeId: body.traineeId,
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
            console.log("check")

            const teamMember = await models.TeamMembers.findOne({
                where: {
                  traineeId  : query.traineeId,
                  
                },
                attribute:['teamMemberId']
            });
            console.log("check",teamMember)

            const tasks = await models.Tasks.findAll({
                where: {
                    teamMemberId: teamMember.dataValues.teamMemberId,

                }
            });
            console.log("check",tasks)

            const pendingTasks = await models.Tasks.findAll({
                where: {
                    teamMemberId: teamMember.dataValues.teamMemberId,
                    status:'Pending'
                }

            });
            console.log("check",pendingTasks)

            const completedTasks = await models.Tasks.findAll({
                where: {
                    teamMemberId: teamMember.dataValues.teamMemberId,
                    status: 'Completed'
                }

            });
            console.log("check",completedTasks)

            const instructor = await models.Trainees.findOne({
                where: {
                    traineeId: query.traineeId
                },
                attributes:[
                    'instuctorId'
                ]
            });
            console.log("check",instructor)

            const instructorName = await models.Instructors.findOne({
                where: {
                    instructorId: instructor.dataValues.instuctorId
                },
                attributes: [
                    'firstName','lastName'
                ]
            });
            console.log("check",instructorName)

            const team = await models.TeamMembers.findOne({
                where: {
                    teamMemberId: teamMember.dataValues.teamMemberId,
                    
                },
                attributes:['teamId']
            });
            console.log("check",team)
            const projectId = await models.Teams.findOne({
                where: {
                    teamId: team.dataValues.teamId,
                },
                attributes: ['projectId']
            });
            console.log("check", projectId)

            const projects = await models.Projects.findOne({
                where: {
                    projectId: projectId.dataValues.projectId,
                },
                attributes:['title']
            });
            console.log("check",projects)


            const taskCount = tasks.length;
            const pendingTasksCount = pendingTasks.length;
            const completedTasksCount = completedTasks.length;
            const instructorsName = instructorName.dataValues.firstName+" "+instructorName.dataValues.lastName;
            const projectName = projects.dataValues.title;

            console.log("taskCount",taskCount)

            return {
                response: {

                    taskCount,
                    pendingTasksCount,
                    completedTasksCount,
                    instructorsName,
                    projectName
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
            const user = await models.Users.findAll({
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