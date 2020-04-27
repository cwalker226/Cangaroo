// This is middleware for restricting routes a Donor is not allowed to visit
module.exports = (req, res, next) => {
  // If the user is a logged in Donor, continue with the request to the restricted route
  if (req.user) {
    if (req.user.user_type === 'donor') {
      return next();
    }
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect('/');
};
