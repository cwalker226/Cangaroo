// Creating our Inventory model
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    // Quantity on  hand
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Inventory;
};
