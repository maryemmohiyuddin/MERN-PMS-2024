const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")
const { v4: uuidV4 } = require("uuid")

module.exports = {
    login: async (body) => {
        try {

            const user = await authModel.login(body.email);
            if (user.error || !user.response) {
                return {
                    error: "invalid credentials",
                };

            }

            const login = await bcryptjs.compare(body.password, user.response.dataValues.password);

            console.log("print", user.response.dataValues)

            if (!login) {
                return {
                    error: "invalid credentials",
                };
            }
            delete user.response.dataValues.password;

            // console.log(user.response.dataValues.userId);


            const session = await sessionModel.getSessionByUserId(user.response.dataValues.userId);

            if (session.error) {
                return {
                    error: error
                }
            }
            // console.log("check 1")

            const deleteSession = await sessionModel.deleteSession(user.response.dataValues.userId);

            if (deleteSession.error) {
                return {
                    error: error
                }

            }

            const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
                expiresIn: "1h",
            })
            const sessionId = uuidV4();
            // console.log(sessionId, token, user.response.dataValues.userId);
            const createSession = await sessionModel.createSession(
                sessionId,
                user.response.dataValues.userId,
                token,
            )
            if (createSession.error) {
                return {
                    error: "Invalid User"
                }

            }

            return {
                response: user.response,
            };
        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    logout: async (body) => {
        try {
            const logoutResponse = await authModel.logout(body);
            console.log("req body data", body)
            var number = body.number;
            if (number % 2 == 0) {
                console.log("Number is Even");
            }
            else {
                console.log("Number is Odd");
            }

            if (logoutResponse.error) {
                return {
                    error: logoutResponse.error,
                };

            }
            return {
                response: logoutResponse.response,
            };
        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    signup: async (body) => {
        try {
            delete body.confirmPassword;
            body.password = await bcryptjs.hash(body.password, 10)
            const signupResponse = await authModel.signup(body);
            if (signupResponse.error) {
                return {
                    error: signupResponse.error,
                };

            }
            return {
                response: signupResponse.response,
            };
        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    resetpswd: () => {
        try {
            const resetpswdResponse = authModel.resetpswd();
            if (resetpswdResponse.error) {
                return {
                    error: resetpswdResponse.error,
                };

            }
            return {
                response: resetpswdResponse.response,
            };
        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    forgotpswd: () => {
        try {
            const forgotpswdResponse = authModel.forgotpswd();
            if (forgotpswdResponse.error) {
                return {
                    error: forgotpswdResponse.error,
                };

            }
            return {
                response: forgotpswdResponse.response,
            };
        }

        catch (error) {
            return {
                error: error,
            };
        }
    },




};