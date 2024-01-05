const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")
const { v4: uuidV4 } = require("uuid")
const bcrypt = require("bcryptjs")

module.exports = {
    login: async (body) => {
        try {
            const user = await authModel.login(body.email);
            if (user.error || !user.response) {
                return {
                    error: "invalid credentials",
                };
            }

            const login = await bcrypt.compare(
                body.password,
                user.response.dataValues.password
            );

            if (!login) {
                return {
                    error: "invalid credentials",
                };
            }
            delete user.response.dataValues.password;

            const userId = user.response.dataValues.userId;

            const session = await sessionModel.getSessionByUserId(userId);

            if (session.error) {
                return {
                    error: session.error,
                };
            }

            const deleteSession = await sessionModel.deleteSession(userId);

            if (deleteSession.error) {
                return {
                    error: deleteSession.error,
                };
            }

            const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
                expiresIn: "1h",
            });


            const sessionId = uuidV4();
            const createSession = await sessionModel.createSession(
                sessionId,
                token,
                userId
            );
            console.log("string", createSession)


            if (createSession.error || !createSession.response) {
                return {
                    error: "invalid user",
                };
            }

            const Session = createSession.response.dataValues;
            Session.role = user.response.dataValues.role;
            Session.isRequested = user.response.dataValues.isRequested;
            Session.isApproved = user.response.dataValues.isApproved;
            Session.isBlocked = user.response.dataValues.isBlocked;
            Session.firstName = user.response.dataValues.firstName;
            Session.lastName = user.response.dataValues.lastName;



            return {
                response: Session,
            };
        } catch (error) {
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
    getSession: async (userId) => {
        try {
            const session = await authModel.getSession(userId);
            if (session.error || !session.response) {
                return {
                    error: session.error,
                };
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