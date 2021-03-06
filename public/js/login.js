/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  const handleLoginErr = () => {
    $('#alert .msg').text("We couldn't log you in with that info. Please try again.");
    $('#alert').fadeIn(500);
  };
  /* Close the login error window when the 'x' is clicked */
  $('.delete').on('click', (event) => {
    $(event.currentTarget).parent('div').fadeOut();
  });

  // loginUser does a post to our 'api/login' route
  // If successful, redirects us to the members page
  function loginUser(email, password) {
    $.post('/api/login', {
      email,
      password,
    })
      .then(() => {
        window.location.replace('/members');
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
  }

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
});
