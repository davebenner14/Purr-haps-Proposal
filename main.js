$(document).ready(function () {
  $("#enterButton").click(function () {
      // Fade out the button
      $(this).fadeOut(1000, function() {
          // Also fade out the curtain here
          $(".curtain").fadeOut(2000, function() {
              // After the curtain fades out, start the sequence of messages
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
  if (index >= messages.length) return; // Stop if no more messages

  // Create message element dynamically
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
      }, 5000); // Delay between messages
  });
}
