document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "Assets/preview1.jpg",
    "Assets/preview2.jpg",
    "Assets/preview3.jpg"
  ];
  let currentImageIndex = 0;

  function updateContent() {
    const imgElement = document.getElementById("previewImage");
    imgElement.src = images[currentImageIndex];

    let text;
    if (currentImageIndex === 0) {
      text =
        "Within the bustling taverns of Grimore Grove, adventurers gather, sharing tales of mystical lands and daring quests.";
    } else if (currentImageIndex === 1) {
      text =
        "Among these, a particular tavern was always abuzz, known not just for its ale, but as a trading hub for the finest weapons and armor.";
    } else if (currentImageIndex === 2) {
      text =
        "Yet, whispered legends spoke of Purr-haps: a place of unmatched allure, where adventurers found gear that legends are made of.";
      document.getElementById("exploreButton").style.display = "none";
      document.getElementById("enterTavernButton").style.display = "block";
    }
    document.getElementById("previewText").innerText = text;
  }

  function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length; // Increment the index
    updateContent(); // Update the image and text based on the new index
  }

  updateContent(); // Set the first image and text

  document
    .getElementById("exploreButton")
    .addEventListener("click", changeImage);

  document
    .getElementById("enterTavernButton")
    .addEventListener("click", function () {
      window.location.href = "tavern.html"; // Navigate to tavern.html
    });
});
