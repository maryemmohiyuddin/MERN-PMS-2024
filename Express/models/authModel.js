const { models } = require("./index");


module.exports = {
    login: async (body) => {
        let user; // Declare user outside the if-else block

        try {
            if (body.role == "trainee") {
                user = await models.Trainees.findOne({
                    where: {
                        email: body.email,
                    },
                });
            } else {
                user = await models.Instructors.findOne({
                    where: {
                        email: body.email,
                    },
                });
            }

            console.log("this user", user.dataValues);

            return {
                response: user,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },


    logout:async (body) => {
        try {
            const user = await models.Sessions.destroy({
                where: {
                    userId: body.userId,
                },
            });
            console.log("this user", user)
           
            return {
                response: "session deleted successfully",
            };
        } catch (error) {
            return {
                error: error,
            };
        }

    },
    signup: async (body) => {
        try {
            return {
                response: body,
            }

        } catch (error) {
            return {
                error: error
            }
        };

    },
    resetpswd: () => {
        try {
            return {
                response: "reset your password"
            }

        } catch (error) {
            return {
                error: error
            }
        };

    },
    forgotpswd: () => {
        try {
            return {
                response: "password resetted"
            }

        } catch (error) {
            return {
                error: error
            }
        };

    },
    getSession: async (request) => {
        try {
            console.log("model",request.instructorId)
            console.log("model trainee", request.traineeId)

            let session;
            if(request.instructorId){
             session = await models.Sessions.findOne({
                where: {
                    instructorId: request.instructorId,
                },
            });
        }
           else if (request.traineeId) {
                session = await models.Sessions.findOne({
                    where: {
                        traineeId: request.traineeId,
                    },
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