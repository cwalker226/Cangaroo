// Creating our Assist model
module.exports = (sequelize, DataTypes) => {
  const Assist = sequelize.define('Assist', {
    // Quantity provided
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Assist.associate = (models) => {
    Assist.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      as: 'product',
    });
  };

  return Assist;
};
