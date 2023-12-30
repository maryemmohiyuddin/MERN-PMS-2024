const { v4: UUIDV4 } = require("uuid");
const { hash } = require("bcryptjs")


module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (index = 0; index < 100; index++) {
            const password = await hash("smss1311313", 10);
            queryInterface.bulkInsert('users', [{
                userId: UUIDV4(),
                firstName: 'John',
                lastName: 'Doe',
                email: index + 'example2@example.com',
                role: 'trainee',
                password,

                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        }
        return true
    },

    down: (queryInterface, Sequelize) => {

    }
};