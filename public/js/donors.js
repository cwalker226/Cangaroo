/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  const donationForm = $('form.donation');

  function handleDonationErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function newDonation(ProductId, quantity, UserEmail) {
    $.post('/api/donation', {
      ProductId,
      quantity,
      UserEmail,
    }).then(() => {
      window.location.reload();
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleDonationErr);
  }

  // When the submit button is clicked, we validate the product and quantity are not blank
  donationForm.on('submit', (event) => {
    const productSelect = $('select#product-select');
    const quantityInput = $('input#quantity-input');
    const emailInput = $('input#UserEmail');

    event.preventDefault();
    const donationData = {
      ProductId: productSelect.val(),
      quantity: quantityInput.val().trim(),
      UserEmail: emailInput.val(),
    };

    if (!donationData.ProductId || !donationData.quantity || !donationData.UserEmail) {
      return;
    }
    // If we have a product and quantity, run the newDonation function
    newDonation(donationData.ProductId, donationData.quantity, donationData.UserEmail);
    productSelect.val('Choose product to donate');
    quantityInput.val('');
  });
});
