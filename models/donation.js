// Creating our Donation model
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    // Quantity donated
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Donation;
};
