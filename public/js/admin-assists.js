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
    $.ajax({
      url: '/api/assistance',
      type: 'PUT',
      data: `id=${id}&confirmed=true`,
      success: () => {
        // console.log(`Confirmed assist with id ${id}`);
        const nutrientClassArr = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
        nutrientClassArr.forEach((nutrientClass) => {
          // console.log(`Now estimating available inventory for nutrient class ${nutrientClass}`);
          $.ajax({
            url: `/api/inventory/assist/${nutrientClass}/${size}`,
            type: 'GET',
            success: (result) => {
              // console.log(`We got a result back for ${nutrientClass}: ${result}`);
              // console.log(result);
              if (result.quantity > 0) {
                const AssistId = id;
                // console.log(`non zero result "${result.quantity}" on quantity, make new basket`);
                const quantity = size * 7;
                const ProductId = result.productid;

                // console.log(`size will be ${quantity}`);
                // console.log(`this is for productId ${ProductId}`);

                /* Make a basket and decrement inventory */
                const newQuantity = result.quantity - quantity;
                if (newQuantity < 0) {
                  // console.log('abort, new quantity under 0, return and go to next basket');
                  return;
                }
                console.log(`new quantity: ${newQuantity}`);

                $.ajax({
                  url: '/api/inventory',
                  type: 'PUT',
                  data: `ProductId=${ProductId}&quantity=${newQuantity}`,
                  success: () => {
                    // console.log(`inventory changed to ${newQuantity}, create the basket record`);
                    $.post('/api/basket', {
                      AssistId,
                      ProductId,
                      quantity,
                    }).then(() => {
                      // console.log(`Created new basket for assist ${id}`);
                    }).catch((err) => console.log(err));
                  },
                }).catch((err) => console.log(err));
              } else {
                // console.log(result);
                // console.log(`there is actually zero for nutrient class ${nutrientClass}`);
              }
              window.location.reload();
            },
          }).catch((err) => {
            console.log(`Error for ${nutrientClass}: ${err}`);
          });
        });
      },
    }).catch(handleAssistErr);
  }

  // When the Confirm Request button is clicked, get the ID of the assist from the button
  $('button.confirm').on('click', function (event) {
    event.preventDefault();
    const id = $(this).data('assistid');
    const size = $(this).data('assistsize');
    const assistData = {
      id,
      size,
    };

    if (!assistData.id || !assistData.size) {
      // console.log(`no id ${assistData.id} or size ${assistData.size}, returning`);
      return;
    }
    // If we have a product and quantity, run the confirmAssist function
    confirmAssist(assistData.id, assistData.size);
  });
});
