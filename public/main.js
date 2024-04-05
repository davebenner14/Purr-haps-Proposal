$(document).ready(function () {
  $("#enterButton").click(function () {
    window.location.href = "welcome.html";
  });

  $(".nextButton").click(function () {
    let currentSection = $(this).closest(".section");
    let nextSection = currentSection.next(".section");

    if (currentSection.attr("id") === "welcomeSection") {
      startLightningAnimation();
      console.log("Lightning animation should start now.");
    }

    if (currentSection.attr("id") === "mysterySection") {
      stopLightningAnimation();
      console.log("Stopping lightning animation.");
    }

    currentSection.fadeOut(1000, function () {
      if (nextSection.length !== 0) {
        nextSection.fadeIn(1000, function () {
          if (nextSection.attr("id") === "mysterySection") {
            nextSection.find("div, .nextButton").fadeIn(1000);
          }
        });
      } else {
        console.log("No more sections to display.");
      }
    });
  });
});
