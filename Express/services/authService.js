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
            const user = await authModel.login(body);
            if (user.error || !user.response) {
                return {
                    error: "Invalid credentials",
                };
            }

            const login = await bcrypt.compare(
                body.password,
                user.response.dataValues.password
            );

            if (!login) {
                return {
                    error: "Invalid credentials",
                };
            }

            // Remove password from the response
            delete user.response.dataValues.password;

            let userId;
            let userType;

            if (body.role === "trainee") {
                userId = user.response.dataValues.traineeId;
                userType = 'trainee';
            } else if (body.role === "instructor") {
                userId = user.response.dataValues.instructorId;
                userType = 'instructor';
            } else {
                return {
                    error: "Invalid role",
                };
            }
            console.log("id", userId);

            const session = await sessionModel.getSessionByUserId(userId, userType);

            if (session.error) {
                return {
                    error: session.error,
                };
            }
            console.log("session", session);

            const deleteSession = await sessionModel.deleteSession(userId, userType);

            if (deleteSession.error) {
                return {
                    error: deleteSession.error,
                };
            }
            console.log("deleteSession", deleteSession);

            const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
                expiresIn: "1h",
            });
            console.log("token", token);

            const sessionId = uuidV4();
            const createSession = await sessionModel.createSession(
                sessionId,
                token,
                userId,
                userType
            );
            console.log("createSession", createSession);

            if (createSession.error || !createSession.response) {
                return {
                    error: "Invalid user",
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
            console.log("req body data", logoutResponse)
         
            if (logoutResponse.error) {
                return {
                    error: "error",
                };

            }
            return {
                response: logoutResponse,
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
    getSession: async (request) => {
        try {
            console.log("service",request)
            const session = await authModel.getSession(request);
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