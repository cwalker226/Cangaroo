// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Middleware to check user type for authorization
const isAdmin = require('../config/middleware/isAdmin');
const isClient = require('../config/middleware/isClient');
const isDonor = require('../config/middleware/isDonor');

// Requiring our models
const db = require('../models');


module.exports = (express) => {
  const router = express.Router();
  router.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }
    res.render('signup');
  });

  router.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }
    res.render('login');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route
  // they will be redirected to the signup page
  router.get('/members', isAuthenticated, (req, res) => {
    if (req.user.user_type === 'client') {
      res.redirect('/members/clients');
    } else if (req.user.user_type === 'donor') {
      res.redirect('/members/donors');
    } else if (req.user.user_type === 'admin') {
      res.redirect('/admin/products');
    }
  });
  router.get('/members/clients', isClient, (req, res) => {
    res.render('clients');
  });
  router.get('/members/donors', isDonor, (req, res) => {
    db.Donation.findAll({
      include: [{
        model: db.Product,
        as: 'product',
      }],
      where: {
        UserEmail: req.user.email,
      },
    }).then((donations) => {
      const UserEmail = req.user.email;
      db.Product.findAll().then((products) => {
        res.render('donors', { donations, products, UserEmail });
      });
    });
  });
  router.get('/admin/products', isAdmin, (req, res) => {
    db.Product.findAll().then((products) => {
      const nutrientClasses = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
      res.render('admin-products', { products, nutrientClasses });
    });
  });
  router.get('/admin/inventory', isAdmin, (req, res) => {
    db.Inventory.findAll({
      include: [{
        model: db.Product,
        as: 'product',
      }],
    }).then((inventory) => {
      res.render('admin-inventory', { inventory });
    });
  });


  return router;
};
