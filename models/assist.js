// Creating our Assist model
module.exports = (sequelize, DataTypes) => {
  const Assist = sequelize.define('Assist', {
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
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
