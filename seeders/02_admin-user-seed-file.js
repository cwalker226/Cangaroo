/* eslint no-unused-vars: 'off' */

const bcrypt = require('bcryptjs');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      user_type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      email: 'a1@a.com',
    }]);
  },
};
