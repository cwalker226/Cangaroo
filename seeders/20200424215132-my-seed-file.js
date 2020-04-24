module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'd1@d.com',
      user_type: 'donor',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '1234',
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      email: 'd1@d.com',
    }]);
  },
};
