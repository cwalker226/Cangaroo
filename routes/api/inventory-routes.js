// *********************************************************************************
// inventory-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require('../../models');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the inventory
  app.get('/api/inventory', (req, res) => {
    // 1. Add a join here to include all of the Product to these inventory
    db.Inventory.findAll({
      include: db.Product,
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // Get route for retrieving a single Inventory
  app.get('/api/inventory/:ProductId', (req, res) => {
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

  // Inventory route for saving a new Inventory
  app.post('/api/inventory', (req, res) => {
    db.Inventory.create(req.body).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // DELETE route for deleting inventory
  app.delete('/api/inventory/:id', (req, res) => {
    db.Inventory.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  // PUT route for updating inventory
  app.put('/api/inventory', (req, res) => {
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
