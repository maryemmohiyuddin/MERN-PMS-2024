const { models } = require("./index");


module.exports = {
    login: async (email) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    email: email,
                },
            });
            console.log("this user",user.dataValues)

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
    getSession: async (userId) => {
        try {
            const session = await models.Sessions.findOne({
                where: {
                    userId: userId,
                },
            });

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