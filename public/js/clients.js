/* eslint-env jquery */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.member-name').text(data.email);
  });

  // Getting references to our form and input
  const assistForm = $('form#basket-form');

  function handleAssistErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the 'new assist' route. If successful, the page is reloaded
  // Otherwise we log any errors
  function newAssist(UserEmail) {
    $.post('/api/assistance', {
      UserEmail,
    }).then(() => {
      window.location.reload();
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleAssistErr);
  }

  // When the submit button is clicked, we validate the product and quantity are not blank
  assistForm.on('submit', (event) => {
    // function getLastSunday(d) {
    //   var t = new Date(d);
    //   t.setDate(t.getDate() - t.getDay());
    //   return t;
    // }

    const sizeInput = $('input#size-input');
    const emailInput = $('input#UserEmail');
    console.log(`emailinput: ${emailInput}`);
    event.preventDefault();
    const assistData = {
      size: sizeInput.val().trim(),
      UserEmail: emailInput.val(),
    };

    /* Donations can't be negative quantity */
    if (Math.sign(assistData.size) === -1) {
      console.log('no negative sizes');
      return;
    }
    if (!assistData.size || !assistData.UserEmail) {
      console.log('canceling assist add, missing size or UserEmail');
      return;
    }
    // If we have a product and quantity, run the newDonation function
    newAssist(assistData.UserEmail);
    console.log(assistData);
    sizeInput.val('');
  });
});
