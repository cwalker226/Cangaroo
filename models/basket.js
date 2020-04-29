// Creating our Basket model
module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define('Basket', {
    // Quantity provided
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Basket.associate = (models) => {
    Basket.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      as: 'product',
    });
    Basket.belongsTo(models.Assist, {
      foreignKey: 'AssistId',
      as: 'assist',
    });
  };

  return Basket;
};
