/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [{
      name: 'hamburger',
      nutrient_class: 'protein',
      servings: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', [{
      id: 8,
    },
    ]);
  },
};
