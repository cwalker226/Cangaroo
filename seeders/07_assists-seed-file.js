/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Assists', [{
      UserEmail: 'c1@c.com',
      size: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Assists', [{
      id: 1,
    },
    ]);
  },
};
