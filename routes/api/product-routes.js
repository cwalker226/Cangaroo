// *********************************************************************************
// product-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require('../../models');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the products
  app.get('/api/products', (req, res) => {
    db.Product.findAll().then((dbProduct) => {
      res.json(dbProduct);
    });
  });

  // Get route for retrieving a single product
  app.get('/api/products/:id', (req, res) => {
    db.Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbProduct) => {
      res.json(dbProduct);
    });
  });

  // POST route for saving a new product
  app.post('/api/products', (req, res) => {
    db.Product.create(req.body).then((dbProduct) => {
      console.log(`New product ID: ${dbProduct.id}`);
      const ProductId = dbProduct.id;
      /* We need a matching inventory record */
      db.Inventory.create({
        ProductId,
        quantity: 0,
      }).then(() => {
        res.json(dbProduct);
      });
    });
  });

  // DELETE route for deleting products
  app.delete('/api/products/:id', (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbProduct) => {
      res.json(dbProduct);
    });
  });

  // PUT route for updating products
  app.put('/api/products', (req, res) => {
    db.Product.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbProduct) => {
      res.json(dbProduct);
    });
  });
};
