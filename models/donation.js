// Creating our Donation model
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    // Quantity donated
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Add ProductId to Donation model
  Donation.associate = (models) => {
    Donation.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Donation;
};
