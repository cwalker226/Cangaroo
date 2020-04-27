// This is middleware for restricting routes a Client is not allowed to visit
module.exports = (req, res, next) => {
  // If the user is a logged in Client, continue with the request to the restricted route
  if (req.user) {
    if (req.user.user_type === 'client') {
      return next();
    }
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect('/');
};
