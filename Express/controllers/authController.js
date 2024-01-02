const authService = require("../services/authService");
const joi = require('joi');

const loginSchema = joi.object().keys({
    email: joi.string().required().email().min(3).max(100),
    password: joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


});

const signupSchema = joi.object().keys({
    firstName: joi.string().required().min(3).max(20),
    lastName: joi.string().required().min(3).max(30),
    email: joi.string().required().email().min(3).max(20),
    password: joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: joi.ref("password"),
})

module.exports = {
    login: async (req, res) => {
        try {
            const validate = await loginSchema.validateAsync(req.body);
            const loginResponse = await authService.login(validate);

            if (loginResponse.error) {
                return res.send({
                    error: loginResponse.error,
                });
            }

            res.cookie("auth", loginResponse.response, {
                maxAge: 60 * 60 * 1000,
            });

            return res.send({
                response: loginResponse.response,
            });
        } catch (error) {
            return res.send({
                error: error,
            });
        }
    },

    logout: (req, res) => {
        try {
            const logoutResponse = authService.logout(req.body);
            if (logoutResponse.error) {
                res.send({
                    error: logoutResponse.error,
                });

            }
            res.send({
                response: logoutResponse.response,
            });
        }
        catch (error) {
            res.send({
                error: error,
            });
        };
    },
    signup: async (req, res) => {
        try {
            const validate = await signupSchema.validateAsync(req.body);
            const signupResponse = await authService.signup(validate);
            if (signupResponse.error) {
                res.send({
                    error: signupResponse.error
                });

            }
            res.send({
                response: signupResponse.response
            });
        }
        catch (error) {
            res.send({
                error: error
            });
        };
    },
    resetpswd: (req, res) => {
        try {
            const resetpswdResponse = authService.resetpswd();
            if (resetpswdResponse.error) {
                res.send({
                    error: resetpswdResponse.error
                });

            }
            res.send({
                response: resetpswdResponse.response
            });
        }
        catch (error) {
            res.send({
                error: error
            });
        };
    },
    forgotpswd: (req, res) => {
        try {
            const forgotpswdResponse = authService.forgotpswd();
            if (forgotpswdResponse.error) {
                res.send({
                    error: forgotpswdResponse.error
                });

            }
            res.send({
                response: forgotpswdResponse.response
            });
        }
        catch (error) {
            res.send({
                error: error
            });
        };
    },
    getSession: async (req, res) => {
        try {
            const userId = req.cookies.auth.userId;
            const session = await authService.getSession(userId);
            if (session.error) {
                res.send({
                    error: session.error,
                });
            }
            res.send({
                response: session.response,
            });
        } catch (error) {
            res.send({
                error: error,
            });
        }
    },
}