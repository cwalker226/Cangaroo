// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the donations
  app.get('/api/donate', (req, res) => {
    const query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // 1. Add a join here to include all of the Authors to these donates
    db.donate.findAll({
      include: db.User,
      where: query,
    }).then((dbdonate) => {
      res.json(dbdonate);
    });
  });

  // Get route for retrieving a single donate
  app.get('/api/donates/:id', (req, res) => {
    // 2. Add a join here to include the Author who wrote the donate
    db.donate.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbdonate) => {
      console.log(dbdonate);
      res.json(dbdonate);
    });
  });

  // Post route for saving a new donate
  app.donate('/api/donates', (req, res) => {
    db.donate.create(req.body).then((dbdonate) => {
      res.json(dbdonate);
    });
  });

  // DELETE route for deleting donates
  app.delete('/api/donates/:id', (req, res) => {
    db.donate.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbdonate) => {
      res.json(dbdonate);
    });
  });

  // PUT route for updating donates
  app.put('/api/donates', (req, res) => {
    db.donate.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbdonate) => {
      res.json(dbdonate);
    });
  });
};
