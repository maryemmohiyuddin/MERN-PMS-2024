const userService = require("../services/userService");
const joi = require("joi");



const createUserSchema = joi.object().keys({
    firstName: joi.string().required().min(3).max(20),
    lastName: joi.string().required().min(3).max(30),
    email: joi.string().required().email(),
    cohort: joi.string().required().min(3).max(30),
    stack: joi.string().required().min(3).max(30),
    password: joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: joi.ref("password"),
    role: joi.string().valid("instructor", "trainee", "admin"),

})



const updateUserSchema = joi.object().keys({
    userId: joi.string().required(),
    firstName: joi.string().min(3).max(20),
    lastName: joi.string().min(3).max(30),
    email: joi.string().email(),
    cohort: joi.string().min(3).max(30),
    stack: joi.string().min(3).max(30),
    role: joi.string().valid("instructor", "trainee"),
    isApproved: joi.boolean(),
    isRequested: joi.boolean(),
    isBlocked: joi.boolean(),
    instructorId: joi.string()
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
    createUser: async (req, res) => {
        try {
            const validate = await createUserSchema.validateAsync(req.body);
            console.log("req.body")
            const user = await userService.createUser(validate);
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
    getAllUsers: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const users = await userService.getAllUsers(req.query);
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

    getUserByUserId: async (req, res) => {
        try {


            const validate = await getByUserIdSchema.validateAsync(req.query);
            const users = await userService.getUserByUserId(validate);
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
            const users = await userService.getAllInstructors(req.query);
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

            const user = await userService.deleteUser(validate);
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
    updateUser: async (req, res) => {
        try {
            const validate = await updateUserSchema.validateAsync(req.body);

            const user = await userService.updateUser(validate);
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
    updateProfile: async (req, res) => {
        try {
            const validate = await updateProfileSchema.validateAsync(req.body);

            const user = await userService.updateUser(validate);
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


            const users = await userService.getAllRequests(req.query);
console.log("query",req.query)
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

            const validate = await  getStatisticsSchema.validateAsync(req.query);

            const statistics = await userService.getAllStatistics(validate);
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