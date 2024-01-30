const instructorService = require("../services/instructorService");
const joi = require("joi");



const createInstructorSchema = joi.object().keys({
    firstName: joi.string().required().min(3).max(20),
    lastName: joi.string().required().min(3).max(30),
    email: joi.string().required().email(),
    password: joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: joi.ref("password"),

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
const getByInsIdSchema = joi.object().keys({
    instructorId: joi.string().required(),
})
const getStatisticsSchema = joi.object().keys({
    instructorId: joi.string().required(),
})


module.exports = {
    createInstructor: async (req, res) => {
        try {
            const validate = await createInstructorSchema.validateAsync(req.body);
            console.log("req.body")
            const instructor = await instructorService.createInstructor(validate);
            if (instructor.error) {
                return res.send({
                    error: instructor.error,
                });

            }
            return res.send({
                response: instructor.response,
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
            const users = await instructorService.getAllUsers(req.query);
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

    getInsById: async (req, res) => {
        try {


            const validate = await getByInsIdSchema.validateAsync(req.query);
            console.log(req.query)
            const users = await instructorService.getInsById(validate);
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
            const users = await instructorService.getAllInstructors(req.query);
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

            const user = await instructorService.deleteUser(validate);
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

            const user = await instructorService.updateUser(validate);
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

            const user = await instructorService.updateUser(validate);
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


            const users = await instructorService.getAllRequests(req.query);
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

            const statistics = await instructorService.getAllStatistics(validate);
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