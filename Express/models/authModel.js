const { models } = require("./index");


module.exports = {
    login: async (email) => {

        try {
            const user = await models.Users.findOne({
                where: {
                    email: email,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
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
    logout: () => {
        try {
            return {
                response: "user is logged out",
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


};