/* eslint no-unused-vars: 'off' */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [{
      name: 'protein',
      nutrient_class: 'protein',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'carbohydrates',
      nutrient_class: 'carbohydrates',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'fats',
      nutrient_class: 'fats',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'dietary fiber',
      nutrient_class: 'fiber',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'minerals',
      nutrient_class: 'minerals',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'vitamins',
      nutrient_class: 'vitamins',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'water',
      nutrient_class: 'water',
      servings: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', [{
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
    ]);
  },
};
