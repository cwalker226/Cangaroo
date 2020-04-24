// Requiring our models
const db = require('../../models');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the assistance given
  app.get('/api/assistance', (req, res) => {
    db.Assist.findAll({}).then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving a single assist
  app.get('/api/assistance/:id', (req, res) => {
    db.Assist.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving a new assist
  app.post('/api/assistance', (req, res) => {
    db.Assist.create(req.body).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting assist
  app.delete('/api/assistance/:id', (req, res) => {
    db.Assist.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating assist
  app.put('/api/assistance', (req, res) => {
    db.Assist.update(
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
};
