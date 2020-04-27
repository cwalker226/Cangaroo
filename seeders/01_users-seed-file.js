/* eslint no-unused-vars: 'off' */

const bcrypt = require('bcryptjs');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'a1@a.com',
      user_type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
    },
    {
      email: 'd1@d.com',
      user_type: 'donor',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
    },
    {
      email: 'c1@c.com',
      user_type: 'client',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      email: 'd1@d.com',
    },
    {
      email: 'c1@c.com',
    },
    {
      email: 'admin',
    }]);
  },
};
