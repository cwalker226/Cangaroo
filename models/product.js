// Creating our Product model
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    // The name cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The nutrient class cannot be null
    // These are the seven major nutrient classes
    nutrient_class: {
      type: DataTypes.ENUM({
        values: ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'],
      }),
      allowNull: false,
    },
    // Servings per unit of product cannot be null
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Add ProductId to Donation model
  Product.associate = (models) => {
    Product.hasMany(models.Donation, {
      as: 'donations',
    });
    // Add ProductId to Inventory model
    Product.hasMany(models.Inventory, {
      as: 'inventory',
    });
    // Add ProductId to Basket model
    Product.hasMany(models.Basket, {
      as: 'basket',
    });
  };

  return Product;
};
