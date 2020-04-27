// *********************************************************************************
// donate-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our models
const db = require('../../models');
// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the donations
  app.get('/api/donation', (req, res) => {
    db.Donation.findAll({
      include: db.User,
    }).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
  // GET route for getting all of the donations for a specific user
  app.get('/api/donation/user/:email', (req, res) => {
    db.Donation.findAll({
      where: {
        UserEmail: req.params.email,
      },
    }).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
  // Get route for retrieving a single donation
  app.get('/api/donation/:id', (req, res) => {
    db.Donation.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
  // Post route for saving a new donation
  app.post('/api/donation', (req, res) => {
    console.log(req.body);
    db.Donation.create(req.body).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
  // DELETE route for deleting donations
  app.delete('/api/donation/:id', (req, res) => {
    db.Donation.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
  // PUT route for updating donations
  app.put('/api/donation', (req, res) => {
    db.Donation.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbdonation) => {
      res.json(dbdonation);
    });
  });
};
