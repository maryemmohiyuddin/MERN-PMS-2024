const jwt = require("jsonwebtoken");
const config = require("./config/config.json");
const sessionModel = require("./models/sessionModel")


module.exports = {
    trainee: async (req, res, next) => {
        try {
            const token = req.cookies.auth;
            if (!token || token == undefined) {
                return res.send({
                    error: "unauthorized user"
                })
            }

            jwt.verify(token, config.jwt.secret, async (error, user) => {
                if (error) {
                    return res.send({
                        error: error
                    })

                }
                console.log(user.role)
                const session = await sessionModel.getSession(user.userId, token);
                if (session.error || !session.response) {
                    return {
                        error: "unauthorized user"
                    }
                }
                if (user.role !== "trainee") {
                    return res.send({
                        error: "unauthorized user"
                    })
                }

                next();


            })
        }
        catch (error) {
            console.log("check")
            return res.send({
                error: "unauthorized User"
            })
        }
    },
    instructor: async (req, res, next) => {
        try {
            const token = req.cookies.auth;
            if (!token || token == undefined) {
                return res.send({
                    error: "unauthorized user"
                })
            }

            jwt.verify(token, config.jwt.secret, async (error, user) => {
                if (error) {
                    return res.send({
                        error: error
                    })

                }
                const session = await sessionModel.getSession(user.userId, token);
                if (session.error || !session.response) {
                    return {
                        error: "unauthorized user"
                    }
                }
                if (user.role !== "instructor") {
                    return res.send({
                        error: "unauthorized user"
                    })
                }
                next();

            })
        }
        catch (error) {
            return res.send({

                error: "unauthorized User"

            })
        }
    },
}
