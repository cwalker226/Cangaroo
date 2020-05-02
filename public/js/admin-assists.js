/* eslint-env jquery */

$(document).ready(() => {
  function handleAssistErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
  /* Close the error window when the 'x' is clicked */
  $('.delete').on('click', function () {
    $(this).parent('div').fadeOut();
  });

  // Does PUTs to update the assist and inventory records. If successful, we reload the page
  // Otherwise we log any errors
  function confirmAssist(AssistId, familySize) {
    const nutrientClassArr = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
    nutrientClassArr.forEach((nutrientClass, index, array) => {
      $.ajax({
        url: `/api/inventory/assist/${nutrientClass}/${familySize}`,
        type: 'GET',
        success: (result) => {
          const inventoryQuantity = result.quantity;
          if (inventoryQuantity > 0) {
            const servingsNeeded = familySize * 7;
            const servingsPerQuantity = result.productservings;
            let quantityNeeded = Math.ceil(servingsNeeded / servingsPerQuantity);
            const ProductId = result.productid;

            /* Make a basket and decrement inventory */
            let newQuantity = result.quantity - quantityNeeded;
            if (newQuantity < 0) {
              quantityNeeded = result.quantity;
              newQuantity = 0;
            }

            $.ajax({
              url: '/api/inventory',
              type: 'PUT',
              data: `ProductId=${ProductId}&quantity=${newQuantity}`,
              success: () => {
                $.post('/api/basket', {
                  AssistId,
                  ProductId,
                  quantity: quantityNeeded,
                }).then(() => {
                  /* Confirm the assist if we have a basket for this assist ID */
                  if (index === array.length) {
                    $.ajax({
                      url: '/api/assistance',
                      type: 'PUT',
                      data: `id=${AssistId}&confirmed=true`,
                      success: () => {
                        console.log('window reload assistance');
                        window.location.reload();
                      },
                    }).catch(console.log('assistance'));
                  } else {
                    /* Count baskets, then show message if none */
                    const assistBasketUrl = `/api/basket/assist/${AssistId}`;
                    $.get(assistBasketUrl).then((results) => {
                      if (results.length === 0) {
                        console.log('called basket by assist api');
                        const basketMsg = `Not confirmed - could not create any baskets for AssistId ${AssistId} because all nutrient classes are too low on inventory. Please add some donations to your inventory.`;
                        $('#alert .msg').text(basketMsg);
                        $('#alert').fadeIn(500);
                      }
                    }).catch(console.log('basket assist'));
                  }
                }).catch(console.log('basket'));
              },
            }).catch(console.log('inventory'));
          }
        },
      }).catch((err) => console.log('inventory assist', err));
    });
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
      return;
    }
    // If we have a product and quantity, run the confirmAssist function
    confirmAssist(assistData.id, assistData.size);
  });
});
