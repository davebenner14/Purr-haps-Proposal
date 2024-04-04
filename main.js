// $(document).ready(function () {
//   // Handler for the initial "Click to Enter" action
//   $("#enterButton").click(function () {
//     // Redirect to the welcome.html page
//     window.location.href = "welcome.html";
//   });

//   // Handler for all "Next" buttons within sections
//   $(".nextButton").click(function () {
//     let currentSection = $(this).closest(".section");
//     let nextSection = currentSection.next(".section");

//     // Special case: If leaving the Welcome section, trigger the lightning animation
//     if (currentSection.attr("id") === "welcomeSection") {
//       // Assumes startLightningAnimation is a function in lightning.js that initiates the animation
//       startLightningAnimation(); // Make sure this function exists and is accessible globally
//       console.log("Lightning animation should start now.");
//     }

//     // Optional: Stop the lightning animation if moving away from the Mystery section
//     // This assumes you have a function defined to stop the animation
//     if (currentSection.attr("id") === "mysterySection") {
//       stopLightningAnimation(); // This would need to be implemented in your lightning.js
//       console.log("Stopping lightning animation.");
//     }

//     currentSection.fadeOut(1000, function () {
//       if (nextSection.length !== 0) {
//         // If there's a next section to show, fade it in
//         nextSection.fadeIn(1000, function () {
//           // Ensure the "Mystery" section content and next button are ready to be shown
//           if (nextSection.attr("id") === "mysterySection") {
//             nextSection.find("div, .nextButton").fadeIn(1000);
//           }
//         });
//       } else {
//         console.log("No more sections to display."); // Optionally handle the end of sections
//       }
//     });
//   });
// });
