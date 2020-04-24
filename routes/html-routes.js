// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');
// Check if a user is a client
const isClient = require('../config/middleware/isClient');


module.exports = (app) => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
    }
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      // if (req.user.user_type === 'client') {
      //   res.redirect('/members/clients');
      // } else if (req.user.user_type === 'donor') {
      //   res.redirect('/members/donors');
      // }
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route
  // they will be redirected to the signup page
  app.get('/members', isAuthenticated, (req, res) => {
    if (req.user.user_type === 'client') {
      res.redirect('/members/clients');
    } else if (req.user.user_type === 'donor') {
      res.redirect('/members/donors');
    }
  });
  app.get('/members/clients', isClient, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/clients.html'));
  });
  app.get('/members/donors', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/donors.html'));
  });
};
