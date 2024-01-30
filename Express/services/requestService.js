const requestModel = require("../models/requestModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { request } = require("../app");



module.exports = {
    submitRequest: async (body) => {
        try {
         const   requestId=uuidv4();
            const request = await requestModel.submitRequest(body, requestId);

            if (request.error) {
                return {
                    error: request.error,
                }
            }
            return {
                response: request.response,
            }

        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    getRequest: async (query) => {
        try {
            // const offset = (query.pageNo - 1) * query.limit;
            // console.log(offset)
            const requests = await requestModel.getRequest(query);
            if (requests.error) {
                return {
                    error: requests.error,
                }
            } return {
                response: requests.response,
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
            const users = await request.getAllInstructors(query);
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


            const user = await request.deleteUser(query.userId);

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


    updateRequest: async (body) => {
        try {
        

            const request = await requestModel.updateRequest(body);

            if (request.error) {
                return {
                    error: request.error,
                }
            }
            return {
                response: request.response,
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
            const user = await request.getUserById(query);
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
            const requests = await requestModel.getAllRequests(query);
            if (!requests.response || requests.error) {
                return {
                    error: "request does not exist",
                };
            }

            return {
                response: requests.response,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllStatistics: async (query) => {
        try {
            const statistics = await request.getAllStatistics(query);
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