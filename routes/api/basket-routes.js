// Requiring our models
const db = require('../../models');
// Middleware to check user type for authorization

const isAdmin = require('../../config/middleware/isAdmin');
const isClient = require('../../config/middleware/isClient');
// const isDonor = require('../../config/middleware/isDonor');


// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the baskets
  app.get('/api/basket', (req, res) => {
    db.Basket.findAll({}).then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving a single Basket
  app.get('/api/basket/:id', (req, res) => {
    db.Basket.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving a new Basket
  app.post('/api/basket', (req, res) => {
    db.Basket.create(req.body).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting Basket
  app.delete('/api/basket/:id', isAdmin, (req, res) => {
    db.Basket.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating Basket
  app.put('/api/basket', isAdmin, (req, res) => {
    db.Basket.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbPost) => {
      res.json(dbPost);
    });
  });

  app.get('/api/basket/assist/:AssistId', isClient, (req, res) => {
    db.Basket.findAll({
      include: {
        model: db.Product,
        as: 'product',
        where: { id: db.Sequelize.col('Basket.ProductId') },
      },
      where: {
        AssistId: req.params.AssistId,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
