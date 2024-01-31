const userModel = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");



module.exports = {
    createUser: async (body) => {
        try {
            const userId = uuidv4();
            const isUser = await userModel.getUserByemail(body.email);

            if (isUser.response || isUser.error) {
                return {
                    error: "email already exists",
                }
            }

            delete body.confirmPassword;
            body.password = await bcrypt.hash(body.password, 10);
            const user = await userModel.createUser(body, userId);

            if (user.error) {
                return {
                    error: user.error,
                }
            }
            delete user.response.dataValues.password;
            return {
                response: user.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllUsers: async (query) => {
        try {
            // const offset = (query.pageNo - 1) * query.limit;
            // console.log(offset)
            const users = await userModel.getAllUsers(query);
            if (users.error) {
                return {
                    error: users.error,
                }
            } return {
                response: users.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getAllInstructors: async (query) => {
        try {
            // const offset = (query.pageNo - 1) * query.limit;
            // console.log(offset)
            const users = await userModel.getAllInstructors(query);
            if (users.error) {
                return {
                    error: users.error,
                }
            } return {
                response: users.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    deleteUser: async (query) => {
        try {


            const user = await userModel.deleteUser(query.userId);

            if (user.error) {
                return {
                    error: user.error,
                }
            }
            return {
                response: user.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },


    updateUser: async (body) => {
        try {
            const isUser = await userModel.getUserByUserId(body.traineeId);
            console.log("isUser", isUser)
            if (!isUser.response || isUser.error) {
                return {
                    error: "user does not exist",
                }
            }


            const user = await userModel.updateUser(body);

            if (user.error) {
                return {
                    error: user.error,
                }
            }
            return {
                response: user.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },

    getUserByUserId: async (query) => {
        try {
            const user = await userModel.getUserById(query);
            if (!user.response || user.error) {
                return {
                    error: "user does not exist",
                };
            }

            return {
                response: user.response,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllRequests: async (query) => {
        try {
            const user = await userModel.getAllRequests(query);
            if (!user.response || user.error) {
                return {
                    error: "request does not exist",
                };
            }

            return {
                response: user.response,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllStatistics: async (query) => {
        try {
            console.log("check", query)

            const statistics = await userModel.getAllStatistics(query);
            if (!statistics.response || statistics.error) {
                return {
                    error: "request does not exist",
                };
            }
console.log("statistics",statistics)
            return {
                response: statistics.response,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
};