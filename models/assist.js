// Creating our Assist model
module.exports = (sequelize, DataTypes) => {
  const Assist = sequelize.define('Assist', {
    // Quantity provided
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Assist;
};