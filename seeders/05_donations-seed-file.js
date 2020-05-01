/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Donations', [{
      ProductId: 8,
      UserEmail: 'd1@d.com',
      quantity: 2,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 8,
      UserEmail: 'd1@d.com',
      quantity: 3,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Donations', [{
      id: 1,
    },
    {
      id: 2,
    },
    ]);
  },
};
