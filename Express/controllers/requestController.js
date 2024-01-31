const requestService = require("../services/requestService");
const joi = require("joi");



const submitRequestSchema = joi.object().keys({
    traineeId: joi.string().required(),
    instructorId: joi.string().required(),
})

const taskRequestSchema = joi.object().keys({
    traineeId: joi.string().required(),
    instructorId: joi.string().required(),
    taskId: joi.string().required(),
})
const approveTaskRequestSchema = joi.object().keys({
    requestId: joi.string().required(),
    taskId: joi.string().required(),
    taskStatus: joi.string().required(),
    requestStatus: joi.string().required(),

})
const approveRequestSchema = joi.object().keys({
    requestId: joi.string().required(),
    traineeId: joi.string().required(),
})
const updateRequestSchema = joi.object().keys({
    traineeId: joi.string().required(),
    instructorId: joi.string().required(),
    status: joi.string().valid("Approved", "Rejected"),

})
const updateProfileSchema = joi.object().keys({
    userId: joi.string().required(),
    firstName: joi.string().min(3).max(20),
    lastName: joi.string().min(3).max(30),
    email: joi.string().email(),
    cohort: joi.string().min(3).max(30),
    stack: joi.string().min(3).max(30),
    role: joi.string().valid("instructor", "trainee"),
})
// const paginationSchema = joi.object().keys({
//     pageNo: joi.number().greater(0).default(1),
//     limit: joi.number().valid(5, 10).default(5),
//     sortValue: joi
//         .string()
//         .valid("userId", "email", "role", "firstName", "lastName").default("firstName"),
//     sortOrder: joi.valid("ASC", "DESC").default("ASC"),
//     firstName: joi.string(),
//     lastName: joi.string(),
//     email: joi.string(),
//     role: joi.string().valid("instructor", "trainee"),

// })
const getByUserIdSchema = joi.object().keys({
    userId: joi.string().required(),
})
const getStatisticsSchema = joi.object().keys({
    instructorId: joi.string().required(),
})


module.exports = {
    submitRequest: async (req, res) => {
        try {
            const validate = await submitRequestSchema.validateAsync(req.body);
            console.log("req.body")
            const request = await requestService.submitRequest(validate);
            if (request.error) {
                return res.send({
                    error: request.error,
                });

            }
            return res.send({
                response: request.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    taskRequest: async (req, res) => {
        try {
            const validate = await taskRequestSchema.validateAsync(req.body);
            console.log("req.body")
            const request = await requestService.taskRequest(validate);
            if (request.error) {
                return res.send({
                    error: request.error,
                });

            }
            return res.send({
                response: request.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    approveTaskRequest: async (req, res) => {
        try {
            const validate = await approveTaskRequestSchema.validateAsync(req.body);
            console.log("req.body")
            const request = await requestService.approveTaskRequest(validate);
            if (request.error) {
                return res.send({
                    error: request.error,
                });

            }
            return res.send({
                response: request.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getTaskRequest: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const requests = await requestService.getTaskRequest(req.query);
            console.log(req.query)
            if (requests.error) {
                return res.send({
                    error: requests.error,
                });

            }
            return res.send({
                response: requests.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getRequest: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const requests = await requestService.getRequest(req.query);
            console.log(req.query)
            if (requests.error) {
                return res.send({
                    error: requests.error,
                });

            }
            return res.send({
                response: requests.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllRequests: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const requests = await requestService.getAllRequests(req.query);
            console.log(req.query)
            if (requests.error) {
                return res.send({
                    error: requests.error,
                });

            }
            return res.send({
                response: requests.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    getUserByUserId: async (req, res) => {
        try {


            const validate = await getByUserIdSchema.validateAsync(req.query);
            const users = await requestService.getUserByUserId(validate);
            console.log(req.query)
            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllInstructors: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const users = await requestService.getAllInstructors(req.query);
            console.log(req.query)
            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    deleteUser: async (req, res) => {
        try {
            console.log(req.query)
            const validate = await getByUserIdSchema.validateAsync(req.query);

            const user = await requestService.deleteUser(validate);
            if (user.error) {
                return res.send({
                    error: user.error,
                });

            }
            return res.send({
                response: user.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    updateRequest: async (req, res) => {
        try {
            const validate = await updateRequestSchema.validateAsync(req.body);

            const request = await requestService.updateRequest(validate);
            console.log("request", request)
            if (request.error) {
                return res.send({
                    error: request.error,
                });

            }
            return res.send({
                response: request.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    updateProfile: async (req, res) => {
        try {
            const validate = await updateProfileSchema.validateAsync(req.body);

            const user = await requestService.updateUser(validate);
            console.log("user", user)
            if (user.error) {
                return res.send({
                    error: user.error,
                });

            }
            return res.send({
                response: user.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllRequests: async (req, res) => {
        try {


            const users = await requestService.getAllRequests(req.query);
            console.log("query", req.query)
            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllStatistics: async (req, res) => {
        try {

            const validate = await getStatisticsSchema.validateAsync(req.query);

            const statistics = await requestService.getAllStatistics(validate);
            console.log("query", req.query)
            if (statistics.error) {
                return res.send({
                    error: statistics.error,
                });

            }
            return res.send({
                response: statistics.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

}