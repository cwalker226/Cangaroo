// Creating our Assist model
module.exports = (sequelize) => {
  const Assist = sequelize.define('Assist', {
  });

  Assist.associate = (models) => {
    // Add AssistId to Basket model
    Assist.hasMany(models.Basket, {
      as: 'basket',
    });
    Assist.belongsTo(models.User, {
      foreignKey: 'UserEmail',
      as: 'user',
    });
  };

  return Assist;
};
