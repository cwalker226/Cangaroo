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
  function confirmAssist(id, nutrientClass, size) {
    console.log('running confirmAssist');
    $.ajax({
      url: '/api/assistance',
      type: 'PUT',
      data: `id=${id}&confirmed=true`,
      success: () => {
        $.ajax({
          url: `/api/inventory/assist/${nutrientClass}/${size}`,
          type: 'GET',
          data: `nutrientClass=${nutrientClass}&size=${size}`,
          success: () => {
            window.location.reload();
          },
        });
      },
    }).catch(handleAssistErr);
  }

  // When the submit button is clicked, get the ID of the assist from the button
  $('button.confirm').on('click', function (event) {
    event.preventDefault();
    const id = $(this).data('assistid');
    const nutrientClass = $(this).data('nutrientclass');
    const size = $(this).data('size');
    const assistData = {
      id,
      nutrientClass,
      size,
    };

    if (!assistData.id || !assistData.nutrientClass || !assistData.size) {
      console.log('no id, returning instead of calling confirmAssist');
      return;
    }
    // If we have a product and quantity, run the confirmassist function
    confirmAssist(assistData.id, assistData.nutrientClass, assistData.size);
  });
});
