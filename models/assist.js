// Creating our Assist model
module.exports = (sequelize, DataTypes) => {
  const Assist = sequelize.define('Assist', {
    // Quantity donated
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Add ProductId to Assistance model
  Assist.associate = (models) => {
    Assist.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  // Add UserId to Assistance model
  Assist.associate = (models) => {
    Assist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Assist;
};