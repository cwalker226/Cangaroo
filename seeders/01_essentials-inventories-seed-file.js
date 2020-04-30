/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Inventories', [{
      ProductId: 1,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 2,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 3,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 4,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 5,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 6,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 7,
      quantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Inventories', [{
      ProductId: 1,
    },
    {
      ProductId: 2,
    },
    {
      ProductId: 3,
    },
    {
      ProductId: 4,
    },
    {
      ProductId: 5,
    },
    {
      ProductId: 6,
    },
    {
      ProductId: 7,
    },
    ]);
  },
};
