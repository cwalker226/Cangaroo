/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  const productForm = $('form.product');

  function handleProductErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function newProduct(name, servings, nutrientClass) {
    $.post('/api/product', {
      name,
      servings,
      nutrient_class: nutrientClass,
    }).then(() => {
      window.location.reload();
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleProductErr);
  }

  // When the submit button is clicked, we validate the product and quantity are not blank
  productForm.on('submit', (event) => {
    const nameInput = $('input#name-input');
    const servingsInput = $('input#servings-input');
    const nutrientClassSelect = $('select#nutrient_class-select');

    event.preventDefault();
    const productData = {
      name: nameInput.val(),
      servings: servingsInput.val().trim(),
      nutrient_class: nutrientClassSelect.val(),
    };

    if (!productData.name || !productData.servings || !productData.nutrient_class) {
      return;
    }
    // If we have a product and quantity, run the newDonation function
    newProduct(productData.ProductId, productData.quantity, productData.UserEmail);
    nameInput.val('Choose product to donate');
    servingsInput.val('');
  });
});
