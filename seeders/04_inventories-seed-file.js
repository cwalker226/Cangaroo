/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Inventories', [{
      ProductId: 1,
      quantity: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Inventories', [{
      ProductId: 1,
    },
    ]);
  },
};
