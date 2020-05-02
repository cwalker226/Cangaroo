// Requiring necessary npm packages
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); /* eslint global-require: "off" */
}

// Creating express app and configuring middleware needed for authentication
const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set Handlebars.
const exphbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');

const multihelpers = hbshelpers();

app.engine('handlebars', exphbs({
  helpers: multihelpers,
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Requiring passport as we've configured it
const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Requiring our routes
const htmlRoutes = require('./routes/html-routes.js')(express);

app.use(htmlRoutes);

require('./routes/api/assist-routes')(app);
require('./routes/api/basket-routes')(app);
require('./routes/api/donate-routes.js')(app);
require('./routes/api/inventory-routes.js')(app);
require('./routes/api/product-routes.js')(app);
require('./routes/api/user-routes.js')(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    /* Uncomment this for development if desired */
    /* console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT); */
  });
});
