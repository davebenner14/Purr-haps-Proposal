$(document).ready(function () {
  $("#enterButton").click(function () {
    $(this).fadeOut(1000, function () {
      $(".curtain").fadeOut(2000, function () {
        // Start the animation loop but not the lightning yet
        isAnimationActive = true; // Assuming you have access to this variable from lightning.js
        animloop(); // Start or ensure the animation loop is running if not already started in lightning.js

        setTimeout(function () {
          // Your existing setup
          $("#weatherAnimation").empty();
        }, 7000);
        
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
  if (index >= messages.length) {
    // When all messages have been displayed, stop the animation and lightning
    isAnimationActive = false;
    isLightningActive = false;
    return;
  }

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
    .fadeIn(2000, function() {
      setTimeout(function() {
        messageElement.fadeOut(2000, function() {
          console.log(`${messages[index]} text ends`); // Log when text ends
          messageElement.remove();
          // Proceed to the next message
          displayMessagesSequentially(messages, index + 1);
        });
      }, 5000); // How long to keep the message visible
    });

  if (messages[index] === "...A world of mystery...") {
    console.log("Lightning and rain animation begins"); // Log when animation begins
    isLightningActive = true; // Enable lightning effect
    
    setTimeout(function() {
      console.log("Making canvas visible");
      $("#canvas1, #canvas2, #canvas3").css("display", "block");
      console.log("Canvas should now be visible");
      
      setTimeout(function() {
        isLightningActive = false; // Stop creating new lightning after a set time
        console.log("Lightning and rain animation ends"); // Log when animation ends
      }, 9000); // Adjust based on how long you want the lightning effect to run
    }, 2000); // Delay before making canvas visible and starting lightning effect
  } else {
    // For any message that is not "...A world of mystery...", ensure lightning is not active
    isLightningActive = false;
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
