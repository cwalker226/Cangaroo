// Creating our Assist model
module.exports = (sequelize, DataTypes) => {
  const Assist = sequelize.define('Assist', {
    // Quantity provided
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  // Add AssistId to Donation model
  Assist.associate = (models) => {
    // Add AssistId to Basket model
    Assist.hasMany(models.Basket, {
      as: 'basket',
    });
  };

  return Assist;
};
