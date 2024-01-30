const instructorModel = require("../models/instructorModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");



module.exports = {
    createInstructor: async (body) => {
        try {
            const instructorId = uuidv4();
            const isInstructor = await instructorModel.getInstructorByemail(body.email);

            if (isInstructor.response || isInstructor.error) {
                return {
                    error: "This email already exists",
                }
            }

            delete body.confirmPassword;
            body.password = await bcrypt.hash(body.password, 10);
            const instructor = await instructorModel.createInstructor(body, instructorId);

            if (instructor.error) {
                return {
                    error: instructor.error,
                }
            }
            delete instructor.response.dataValues.password;
            return {
                response: instructor.response,
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
            const users = await instructorModel.getAllUsers(query);
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
            const users = await instructorModel.getAllInstructors(query);
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


            const user = await instructorModel.deleteUser(query.userId);

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
            const isUser = await instructorModel.getUserByUserId(body.userId);
            console.log("isUser", isUser)
            if (!isUser.response || isUser.error) {
                return {
                    error: "user does not exist",
                }
            }


            const user = await instructorModel.updateUser(body);

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

    getInsById: async (query) => {
        try {
            const user = await instructorModel.getInsById(query);
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
            const user = await instructorModel.getAllRequests(query);
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
            const statistics = await instructorModel.getAllStatistics(query);
            if (!statistics.response || statistics.error) {
                return {
                    error: "request does not exist",
                };
            }

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