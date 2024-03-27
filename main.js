$(document).ready(function () {
  $("#enterButton").click(function () {
    $(this).fadeOut(1000, function() {
      $(".curtain").fadeOut(2000, function() {
        setTimeout(function() {
          // Ensure this function is defined in `lightning.js` and does not auto-execute.
          createCanvasAndLightning();

          // Optionally, if you want to clear the lightning effect 20 seconds after the button click
          setTimeout(function() {
            // Logic to clear or stop the lightning effect, adjust as needed
            $("#weatherAnimation").empty(); // Example way to clear the effect
          }, 7000); // Clear the effect 7 seconds after it starts (20 seconds from the button click)
        }, 8000); // Start 10 seconds after the button click

        // Display messages
        displayMessagesSequentially([
          "Welcome to the world of Grimore Grove",
          "...A world of mystery...",
          "...A world of wonder"
        ], 0);
      });
    });
  });
});




function displayMessagesSequentially(messages, index) {
  if (index >= messages.length) return; 

  const messageElement = $('<div></div>')
      .text(messages[index])
      .css({
          'position': 'fixed',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)',
          'color': 'white',
          'font-size': '24px',
          'text-align': 'center',
          'display': 'none'
      })
      .appendTo('body');

  // Fade in message
  messageElement.fadeIn(2000, function() {
      // Wait for 5 seconds before fading out
      setTimeout(function() {
          // Fade out message
          messageElement.fadeOut(2000, function() {
              // Remove the message element after fade out
              messageElement.remove();
              // Display next message after a delay
              displayMessagesSequentially(messages, index + 1);
          });
      }, 5000); 
  });
}
