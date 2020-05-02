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
        console.log(`Confirmed assist with id ${id}`);
        const nutrientClassArr = ['carbohydrates', 'fats', 'fiber', 'minerals', 'protein', 'vitamins', 'water'];
        nutrientClassArr.forEach((nutrientClass) => {
          console.log(`Now estimating available inventory for nutrient class ${nutrientClass}`);
          $.ajax({
            url: `/api/inventory/assist/${nutrientClass}/${size}`,
            type: 'GET',
            success: (result) => {
              console.log(`We got a result back for ${nutrientClass}: ${result}`);
              // console.log(result);
              if (result.quantity > 0) {
                console.log(`we got a non zero result "${result.quantity}" on quantity for an inventory, let's make a new basket`);
                const thisQuantity = size * 7;
                console.log(`size will be ${thisQuantity}`);
                const { ProductId } = result;
                /* Make a basket and decrement inventory */
                const newQuantity = result.quantity - thisQuantity;
                console.log(`new quantity: ${newQuantity}`);

                $.ajax({
                  url: '/api/inventory',
                  type: 'PUT',
                  data: `ProductId=${ProductId}&quantity=${newQuantity}`,
                  success: () => {
                    console.log(`we decremented inventory successfully to ${newQuantity}, let's create the basket record`);
                    $.post('/api/basket', {
                      assist: id,
                      quantity: thisQuantity,
                      product: ProductId,
                    })
                      .then(() => {
                        console.log(`Created new basket for assist ${id}`);
                      }).catch((err) => console.log(err));
                  },
                });
              } else {
                console.log(`there is actually zero for nutrient class ${nutrientClass}`);
              }
              // console.log(result);
              // window.location.reload();
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
      console.log(`no id ${assistData.id} or size ${assistData.size}, returning instead of calling confirmAssist`);
      return;
    }
    // If we have a product and quantity, run the confirmAssist function
    confirmAssist(assistData.id, assistData.size);
  });
});
