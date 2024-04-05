document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("descriptionModal");
  const title = document.getElementById("modalTitle");
  const description = document.getElementById("modalDescription");
  const closeButton = document.querySelector(".close-button");

  const descriptions = {
    armoury: {
      title: "Armoury",
      text: "Explore our vast collection of apparel, inspired by the greatest legends of yore. From hoodies to t-shirts, adorn yourself in gear befitting an adventurer."
    },
    quests: {
      title: "Quests",
      text: "Embark on thrilling quests to earn exclusive discounts and discover limited edition treasures. Sign up, accept the challenge, and claim your rewards."
    },
    alchemy: {
      title: "Alchemy",
      text: "Mix and match to create your unique ensemble or customize your gear to stand out in any adventure. Your journey, your style."
    },
    guild: {
      title: "Guild",
      text: "Join our community of like-minded adventurers. Share tales of your quests, show off your gear, and find your fellow adventurers."
    }
  };

  function showModal(buttonId) {
    const { title: modalTitle, text } = descriptions[buttonId];
    title.textContent = modalTitle;
    description.textContent = text;
    modal.style.display = "block";
  }

  document.querySelectorAll(".corner-button").forEach((button) => {
    button.addEventListener("click", () => showModal(button.id));
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("tavernMusic");
  const musicToggle = document.getElementById("musicToggle");

  musicToggle.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      musicToggle.textContent = "Mute Music";
    } else {
      music.pause();
      musicToggle.textContent = "Play Music";
    }
  });
});

document.getElementById("replayIntro").addEventListener("click", function () {
  window.location.href = "index.html";
});
