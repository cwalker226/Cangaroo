/* eslint-env jquery */

$(document).ready(() => {
  function handleAssistErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does PUTs to update the assist and inventory records. If successful, we reload the page
  // Otherwise we log any errors
  function confirmAssist(AssistId, familySize) {
    const nutrientClassArr = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
    nutrientClassArr.forEach((nutrientClass) => {
      $.ajax({
        url: `/api/inventory/assist/${nutrientClass}/${familySize}`,
        type: 'GET',
        success: (result) => {
          const inventoryQuantity = result.quantity;
          if (inventoryQuantity > 0) {
            const servingsNeeded = familySize * 7;
            const servingsPerQuantity = result.productservings;
            const quantityNeeded = Math.ceil(servingsNeeded / servingsPerQuantity);
            const ProductId = result.productid;

            /* Make a basket and decrement inventory */
            const newQuantity = result.quantity - quantityNeeded;
            if (newQuantity < 0) {
              return;
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
                });
              },
            }).catch(handleAssistErr);
            /* Confirm the assist if we have a basket for this assist ID */
            $.ajax({
              url: '/api/assistance',
              type: 'PUT',
              data: `id=${AssistId}&confirmed=true`,
              success: () => {
                window.location.reload();
              },
            });
          }
          /* else there is actually zero for this nutrient class */
        },
      }).catch(handleAssistErr);

      /* If we get this far without returning, no baskets, so double check then show  message */
      $.get('/api/basket', { AssistId }).then((results) => {
        if (results.length === 0) {
          const basketMsg = `Not confirmed - could not create any baskets for AssistId ${AssistId} because all nutrient classes are too low on inventory. Please add some donations to your inventory.`;
          $('#alert .msg').text(basketMsg);
        }
      });
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
