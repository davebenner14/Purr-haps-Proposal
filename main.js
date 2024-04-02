$(document).ready(function () {
  $("#enterButton").click(function () {
    $(this).fadeOut(1000, function () {
      $(".curtain").fadeOut(2000, function () {
        setTimeout(function () {
          createCanvasAndLightning();

          setTimeout(function () {
            $("#weatherAnimation").empty();
          }, 7000);
        }, 8000);

        // Display messages
        displayMessagesSequentially(
          [
            "Welcome to the world of Grimore Grove",
            "...A world of mystery...",
            "...A world of wonder"
          ],
          0
        );
      });
    });
  });
});

function displayMessagesSequentially(messages, index) {
  if (index >= messages.length) return;

  const messageElement = $("<div></div>")
    .text(messages[index])
    .css({
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      "font-size": "24px",
      "text-align": "center",
      display: "none"
    })
    .appendTo("body");

  messageElement.fadeIn(2000, function () {
    setTimeout(function () {
      messageElement.fadeOut(2000, function () {
        messageElement.remove();
        displayMessagesSequentially(messages, index + 1);
      });
    }, 5000);
  });
}

$(document).ready(function () {
  // Find the button by its ID
  $("#enterButton").click(function () {
    // Find the audio element
    var audio = document.getElementById("entryMusic");
    // Play the audio
    audio.play();
  });
});
