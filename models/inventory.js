// Creating our Inventory model
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    // Quantity on  hand
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      as: 'product',
    });
  };

  return Inventory;
};
