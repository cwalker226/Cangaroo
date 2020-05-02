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
      return res.redirect('/members');
    }
    return res.render('login');
  });

  router.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }
    res.render('signup');
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
    db.Assist.findAll({
      where: {
        UserEmail: req.user.email,
      },
    }).then((assistance) => {
      const confirmedAssistance = assistance.filter((item) => item.confirmed);
      const unconfirmedAssistance = assistance.filter((item) => !item.confirmed);
      const UserEmail = req.user.email;
      res.render('clients', {
        assistance,
        confirmedAssistance,
        unconfirmedAssistance,
        UserEmail,
      });
    });
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
      const confirmedDonations = donations.filter((item) => item.confirmed);
      const unconfirmedDonations = donations.filter((item) => !item.confirmed);
      const UserEmail = req.user.email;
      db.Product.findAll().then((products) => {
        res.render('donors', {
          donations,
          confirmedDonations,
          unconfirmedDonations,
          products,
          UserEmail,
        });
      });
    });
  });

  /* Admin page routes */
  router.get('/admin/products', isAdmin, (req, res) => {
    db.Product.findAll({}).then((products) => {
      const userType = 'admin';
      const nutrientClasses = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
      res.render('admin-products', { products, nutrientClasses, userType });
    });
  });
  router.get('/admin/inventory', isAdmin, (req, res) => {
    db.Inventory.findAll({
      include: [{
        model: db.Product,
        as: 'product',
      }],
    }).then((allInventory) => {
      const userType = 'admin';
      const inventory = allInventory.map((item) => {
        const inventoryItem = {};
        inventoryItem.productId = item.dataValues.product.id;
        inventoryItem.name = item.dataValues.product.name;
        inventoryItem.quantity = item.dataValues.quantity;
        inventoryItem.nutrient_class = item.dataValues.product.nutrient_class;
        inventoryItem.total_servings = item.dataValues.quantity * item.dataValues.product.servings;
        return inventoryItem;
      });
      res.render('admin-inventory', { inventory, userType });
    });
  });
  router.get('/admin/donations', isAdmin, (req, res) => {
    db.Donation.findAll({
      include: [{
        model: db.Product,
        as: 'product',
      }],
    }).then((allDonations) => {
      const userType = 'admin';
      const donations = allDonations.map((item) => {
        const donationRecord = {};
        donationRecord.id = item.dataValues.id;
        donationRecord.donor = item.dataValues.UserEmail;
        donationRecord.productId = item.dataValues.product.id;
        donationRecord.name = item.dataValues.product.name;
        donationRecord.quantity = item.dataValues.quantity;
        donationRecord.nutrient_class = item.dataValues.product.nutrient_class;
        donationRecord.total_servings = item.dataValues.quantity * item.dataValues.product.servings;
        donationRecord.confirmed = item.dataValues.confirmed;
        donationRecord.updatedAt = item.dataValues.updatedAt;
        return donationRecord;
      });
      const confirmedDonations = donations.filter((item) => item.confirmed);
      const unconfirmedDonations = donations.filter((item) => !item.confirmed);

      res.render('admin-donations', {
        donations,
        confirmedDonations,
        unconfirmedDonations,
        userType,
      });
    });
  });

  router.get('/admin/assists', isAdmin, (req, res) => {
    db.Assist.findAll({
      include: [{
        model: db.User,
        as: 'user',
      }, {
        model: db.Basket,
        as: 'basket',
      }],
    }).then((allAssists) => {
      const userType = 'admin';
      const assists = allAssists.map((item) => {
        const assistPeople = {};
        assistPeople.id = item.dataValues.id;
        assistPeople.UserEmail = item.dataValues.UserEmail;
        assistPeople.createdAt = item.dataValues.createdAt;
        assistPeople.updatedAt = item.dataValues.updatedAt;
        assistPeople.confirmed = item.dataValues.confirmed;
        assistPeople.size = item.dataValues.size;
        return assistPeople;
      });

      const confirmedAssists = assists.filter((item) => item.confirmed);
      const unconfirmedAssists = assists.filter((item) => !item.confirmed);
      res.render('admin-assists', {
        assists,
        confirmedAssists,
        unconfirmedAssists,
        userType,
      });
    });
  });
  return router;
};
