/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Donations', [{
      ProductId: 1,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 2,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 3,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 4,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 5,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 6,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      ProductId: 7,
      UserEmail: 'd1@d.com',
      quantity: 100,
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
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
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    ]);
  },
};
