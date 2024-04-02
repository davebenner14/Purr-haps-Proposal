$(document).ready(function () {
  $("#enterButton").click(function () {
    $(this).fadeOut(1000, function () {
      $(".curtain").fadeOut(2000, function () {
        setTimeout(function () {
          // Previously intended for initial lightning effect setup
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

  const showMessage = () => {
    console.log(`${messages[index]} text begins`); // Log when text begins
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
      .appendTo("body")
      .fadeIn(2000, () => {
        setTimeout(() => {
          messageElement.fadeOut(2000, () => {
            console.log(`${messages[index]} text ends`); // Log when text ends
            messageElement.remove();
            if (index + 1 < messages.length) {
              displayMessagesSequentially(messages, index + 1);
            }
          });
        }, 5000); // How long to keep the message visible
      });
  };

  if (messages[index] === "...A world of mystery...") {
    console.log("Lightning and rain animation begins"); // Log when animation begins
    setTimeout(() => {
      $("#canvas1, #canvas2, #canvas3").css("display", "block");
    }, 2000); // Corrected to wait 2 seconds before showing the effect

    showMessage();

    // Hide the effect 2 seconds after the message
    setTimeout(() => {
      $("#canvas1, #canvas2, #canvas3").css("display", "none");
      console.log("Lightning and rain animation ends"); // Log when animation ends
    }, 9000); // Adjust the timing as needed
  } else {
    showMessage();
  }
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
