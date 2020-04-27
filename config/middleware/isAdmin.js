// This is middleware for restricting routes a Admin is not allowed to visit
module.exports = (req, res, next) => {
  // If the user is a logged in Admin, continue with the request to the restricted route
  if (req.user) {
    if (req.user.user_type === 'admin') {
      return next();
    }
  } else {
    // If the user isn't logged in, redirect them to the login page
    return res.redirect('/');
  }
};
