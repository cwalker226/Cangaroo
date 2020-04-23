const Product = require('./product');

// Creating our Product model
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    // Quantity on  hand
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Will add productId to Inventory model
  Inventory.belongsTo(Product);

  return Inventory;
};
