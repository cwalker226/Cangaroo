// *********************************************************************************
// inventory-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
const { QueryTypes } = require('sequelize');

// Requiring our models
const db = require('../../models');

// Middleware so that only Admins can do admin things
const isAdmin = require('../../config/middleware/isAdmin');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the inventory
  app.get('/api/inventory', isAdmin, (req, res) => {
    // 1. Add a join here to include all of the Product to these inventory
    db.Inventory.findAll({
      include: db.Product,
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // Get route for retrieving a single Inventory
  app.get('/api/inventory/:ProductId', isAdmin, (req, res) => {
    // 2. Add a join here to include the Product who wrote the Inventory
    db.Inventory.findOne({
      include: {
        model: db.Product,
        as: 'product',
      },
      where: {
        ProductId: req.params.ProductId,
      },
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // Get route for retrieving a single Inventory by Nutrient Class
  app.get('/api/inventory/assist/:nutrientClass/:familySize', isAdmin, (req, res) => {
    const { familySize, nutrientClass } = req.params;
    const assistSize = familySize * 7;
    console.log(`request inventory for ${nutrientClass}, ${assistSize}`);
    const sql = `SELECT i.quantity, p.name, p.id AS productid, p.servings AS productservings
                   FROM inventories AS i 
                        INNER JOIN products AS p 
                        ON i.ProductId = p.id
                            AND p.servings * i.quantity >= :assistSize
                            AND p.nutrient_class = :nutrientClass 
                        ORDER BY RAND() 
                        LIMIT 1;`;
    db.sequelize.query(sql, {
      replacements: { assistSize, nutrientClass },
      type: QueryTypes.SELECT,
    }).then((dbInventory) => {
      // console.log(dbInventory);
      if (dbInventory.length === 0) {
        const remainingInventorySql = `SELECT i.quantity, p.name, p.id AS productid, p.servings AS productservings
                   FROM inventories AS i 
                        INNER JOIN products AS p 
                        ON i.ProductId = p.id
                            AND i.quantity >= 1
                            AND p.nutrient_class = :nutrientClass 
                        ORDER BY RAND() 
                        LIMIT 1;`;
        // console.log('no inventory for that nutrient class');
        db.sequelize.query(remainingInventorySql, {
          replacements: { nutrientClass },
          type: QueryTypes.SELECT,
        }).then((resultSmaller) => {
          console.log(resultSmaller[0]);
        });
      }
      return res.json(dbInventory[0]);
    });
  });

  // Inventory route for saving a new Inventory
  app.post('/api/inventory', isAdmin, (req, res) => {
    db.Inventory.create(req.body).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // DELETE route for deleting inventory
  app.delete('/api/inventory/:id', isAdmin, (req, res) => {
    db.Inventory.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // PUT route for updating inventory
  app.put('/api/inventory', isAdmin, (req, res) => {
    db.Inventory.update(
      req.body,
      {
        where: {
          ProductId: req.body.ProductId,
        },
      },
    ).then((dbInventory) => {
      res.json(dbInventory);
    });
  });
};
