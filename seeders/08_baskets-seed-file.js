/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Baskets', [{
      ProductId: 1,
      AssistId: 1,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Baskets', [{
      id: 1,
    },
    ]);
  },
};
