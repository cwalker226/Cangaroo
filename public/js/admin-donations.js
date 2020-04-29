/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  // const donationConfirmForm = $('button.confirm');

  function handleDonationErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does PUTs to update the donation and inventory records. If successful, we reload the page
  // Otherwise we log any errors
  function confirmDonation(id, ProductId, quantity) {
    const apiPath = `/api/inventory/${ProductId}`;
    $.get(apiPath).then((inventoryRecord) => {
      const newQuantity = inventoryRecord.quantity + quantity;
      $.ajax({
        url: '/api/inventory',
        type: 'PUT',
        data: `ProductId=${ProductId}&quantity=${newQuantity}`,
        success: () => {
          $.ajax({
            url: '/api/donation',
            type: 'PUT',
            data: `id=${id}&confirmed=true`,
            success: () => {
              window.location.reload();
            },
          });
        },
      }).catch(handleDonationErr);
    });
  }

  // When the submit button is clicked, get the ID of the donation from the button
  $('button.confirm').on('click', function (event) {
    event.preventDefault();
    console.log($(this));
    const id = $(this).data('donationid');
    const ProductId = $(this).data('productid');
    const quantity = $(this).data('quantity');
    const donationData = {
      id,
      ProductId,
      quantity,
    };

    if (!donationData.id || !donationData.ProductId || !donationData.quantity) {
      return;
    }
    // If we have a product and quantity, run the confirmDonation function
    confirmDonation(donationData.id, donationData.ProductId, donationData.quantity);
  });

  $('button.reject').on('click', function (event) {
    event.preventDefault();
    const id = $(this).data('donationid');
    $.ajax({
      method: 'DELETE',
      url: `/api/donation/${id}`,
    }).then(() => window.location.reload());
  });
});
