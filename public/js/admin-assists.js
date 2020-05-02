/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  // const assistConfirmForm = $('button.confirm');

  function handleAssistErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does PUTs to update the assist and inventory records. If successful, we reload the page
  // Otherwise we log any errors
  function confirmAssist(id, size) {
    // console.log('running confirmAssist');
    $.ajax({
      url: '/api/assistance',
      type: 'PUT',
      data: `id=${id}&confirmed=true`,
      success: () => {
        const nutrientClassArr = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
        nutrientClassArr.forEach((nutrientClass) => {
          $.ajax({
            url: `/api/inventory/assist/${nutrientClass}/${size}`,
            type: 'GET',
            success: (result) => {
              if (result.quantity > 0) {
                console.log(`we got a non zero result "${result.quantity}" on quantity for a basket, let's make a new basket`);
              }
              console.log(result);
              // window.location.reload();
            },
          });
        });
      },
    }).catch(handleAssistErr);
  }

  // When the Confirm Request button is clicked, get the ID of the assist from the button
  $('button.confirm').on('click', function (event) {
    event.preventDefault();
    const id = $(this).data('assistid');
    console.log(id);
    const size = $(this).data('assistsize');
    const assistData = {
      id,
      size,
    };

    if (!assistData.id || !assistData.size) {
      console.log(`no id ${assistData.id} or size ${assistData.size}, returning instead of calling confirmAssist`);
      return;
    }
    // If we have a product and quantity, run the confirmAssist function
    confirmAssist(assistData.id, assistData.size);
  });
});
