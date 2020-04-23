// Import Sequelize so we can access the 'now' function
const Sequelize = require('sequelize');

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

  // Add UserId to Donation model
  Donation.associate = (models) => {
    Donation.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Donation;
};
