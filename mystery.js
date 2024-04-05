// Best viewed in Chrome
// Click anywhere to make your own lightning!

//=============================
// Consts
//=============================
const HAS_FLASH = true;
const TIME_BETWEEN_LIGHTNING = 1000;

const MAX_POINTS = 120;
const MAX_X_DISTANCE = 9; // 10 - 30
const MAX_Y_DISTANCE = 8; // 10 - 30
const MAX_WIDTH = 3; // 1 - 10

const FADE_INCREMENT = 0.013; // 0 - 0.02

const LIGHTNING_CHANCE = 0.03;
const SHEET_CHANCE = 0.2;
const BRANCH_CHANCE = 0.01;
const FLICKER_CHANCE = 0.023;
const BRANCH_BRANCH_CHANCE = 0.9;

//=============================
// Helpers
//=============================
const getTimestamp = () => {
  return new Date().getTime();
};

const random = (max = 1, unsigned = false) => {
  return unsigned ? (Math.random() - 0.5) * 2 * max : Math.random() * max;
};

//=============================
// Main
//=============================
const lightningCanvas = document.getElementById("lightning");
const ctx = lightningCanvas.getContext("2d");
const cloudLightningCanvas = document.getElementById("cloudlightning");
const clCtx = cloudLightningCanvas.getContext("2d");
const lightningSheetCanvas = document.getElementById("lightningSheet");
const lsCtx = lightningSheetCanvas.getContext("2d");

let HAS_CLOUD_EFFECTS = true;

let lightning = [];
let cloudLightning = [];
let flashes = [];
let lightningSheets = [];

let stageWidth = 0;
let stageHeight = 0;
let previousTimestamp = getTimestamp();
let previousRender = getTimestamp();

const loop = () => {
  ctx.clearRect(0, 0, stageWidth, stageHeight);
  clCtx.clearRect(0, 0, stageWidth, stageHeight);
  lsCtx.clearRect(0, 0, stageWidth, stageHeight);

  lightning.forEach((path) => {
    path.animate();
    path.render();
  });

  if (HAS_CLOUD_EFFECTS) {
    cloudLightning.forEach((cloud) => {
      cloud.animate();
      cloud.render();
    });

    lightningSheets.forEach((lightningSheet) => {
      lightningSheet.animate();
      lightningSheet.render();
    });
  } else {
    cloudLightning.forEach((cloud) => (cloud.alpha = 0));
    lightningSheets.forEach((cloud) => (cloud.alpha = 0));
  }

  if (HAS_FLASH) {
    flashes.forEach((path) => {
      path.animate();
      path.render();
    });
  }

  // create lightning or lightning sheet
  if (
    random() < LIGHTNING_CHANCE &&
    getTimestamp() - previousTimestamp > TIME_BETWEEN_LIGHTNING
  ) {
    if (random() > 0.4) {
      lightning.push(new Lightning());
    } else {
      lightningSheets.push(new LightningSheet());
    }

    previousTimestamp = getTimestamp();
  }

  lightning = lightning.filter((path) => path.alpha > 0);
  cloudLightning = cloudLightning.filter((cloud) => cloud.alpha > 0);
  flashes = flashes.filter((sheet) => sheet.alpha > 0);
  lightningSheets = lightningSheets.filter((sheet) => sheet.alpha > 0);

  requestAnimationFrame(loop);
};

class Lightning {
  constructor(ox, oy, width, isBranch = false, branchDirection) {
    const x = ox || random(stageWidth);
    const y = oy || 40 + random(100);
    let newCloud;

    this.paths = [];
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 1;
    this.hasEnded = false;
    this.width = width || random(MAX_WIDTH) + 1;
    this.isBranch = isBranch;
    this.xDeviation = isBranch ? 1.3 : 1;
    this.branchDirection = branchDirection || (Math.random() - 0.5) * 2;
    this.flickerCount = 0;
    this.clouds = [];

    this.paths.push({
      x,
      y
    });

    if (HAS_FLASH) {
      flashes.push(new Flash(this.width));
    }

    if (!this.isBranch) {
      newCloud = new CloudLightning(x, y, this.width);
      cloudLightning.push(newCloud);
      this.clouds.push(newCloud);
    }

    if (this.isBranch) {
      this.width = 1;
    }
  }

  animate() {
    const newLines = 3 + random(5);
    const branchChance = this.isBranch ? BRANCH_BRANCH_CHANCE : BRANCH_CHANCE;

    if (!this.hasEnded) {
      const previousPoint = this.getLastPoint();
      let lastX = previousPoint.x;
      let lastY = previousPoint.y;
      let newX, newY;
      let xDirection;

      // add new extensions
      for (let i = 0; i < newLines; i++) {
        xDirection = this.isBranch
          ? this.branchDirection
          : (Math.random() - 0.5) * 2;
        newX = lastX + xDirection * MAX_X_DISTANCE * this.xDeviation;
        newY = lastY + random(MAX_Y_DISTANCE) + 2;

        lastX = newX;
        lastY = newY;
        this.paths.push({
          x: newX,
          y: newY
        });

        if (this.isBranch && random() < 0.03) {
          lightning.push(new Lightning(lastX, lastY, this.width, true));
        }
      }

      // when to stop extending
      this.hasEnded =
        lastY / stageHeight > 0.8 ||
        (random() > 0.6 && this.paths.length > (MAX_POINTS * 3) / 4) ||
        this.paths.length > MAX_POINTS ||
        (this.isBranch && this.paths.length > 5);

      // create branches
      if (
        random() > branchChance &&
        this.paths.length > 5 &&
        this.paths.length < (MAX_POINTS * 2) / 3
      ) {
        lightning.push(new Lightning(lastX, lastY, this.width, true));
      }
    }

    // fade out
    if (this.alpha > 0) {
      this.alpha -= FADE_INCREMENT;

      // fade out purple
      if (this.alpha < 0.5) {
        this.green -= 4.5;
      }

      if (this.isBranch) {
        this.alpha -= FADE_INCREMENT / 2;
      }
    }

    // cool flicker
    if (
      !this.isBranch &&
      random() < FLICKER_CHANCE &&
      this.flickerCount < 2 &&
      this.alpha > 0.3
    ) {
      this.alpha = 1;
      this.green = 240;
      this.flickerCount++;

      this.clouds.map((cloud) => {
        cloud.alpha = random(0.6) + 0.3;
      });
    }

    if ((this.isBranch && this.flickerCount > 0) || this.alpha < 0) {
      this.alpha = 0;
    }
  }

  render() {
    const colour = this.getColour();

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineWidth = this.width;

    this.paths.forEach((path) => {
      ctx.lineTo(path.x, path.y);
    });

    ctx.stroke();
  }

  getColour(red, green, blue, alpha) {
    return `rgba(${red || this.red}, ${green || this.green}, ${
      blue || this.blue
    }, ${alpha || this.alpha})`;
  }

  getLastPoint() {
    if (this.paths.length > 0) {
      const lastPoint = this.paths[this.paths.length - 1];

      return {
        x: lastPoint.x,
        y: lastPoint.y
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
}

class Flash {
  constructor(flash = 1) {
    this.alpha = 0.09 * flash;
  }

  animate() {
    this.alpha -= FADE_INCREMENT * 2;
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(50, 48, 51, ${this.alpha})`;
    ctx.fillRect(0, 0, stageWidth, stageHeight);
  }
}

class LightningSheet {
  constructor(x, y, isRoot = true) {
    this.alpha = random(0.6) + 0.2;
    this.x = x || random(stageWidth);
    this.y = y || random(stageHeight * 0.6) - 100;
    this.size = random(50) + 40;

    // size proportionately to the horizon to create perspective
    this.size = (1 - (this.y / stageHeight) * 0.6) * this.size;

    if (isRoot) {
      let sheetX, sheetY;

      for (let i = 0; i < random(12) + 4; i++) {
        sheetX = this.x + random(300, true);
        sheetY = this.y + random(80, true);
        lightningSheets.push(new LightningSheet(sheetX, sheetY, false));
      }
    }
  }

  animate() {
    this.alpha -= FADE_INCREMENT * 0.8;

    if (this.alpha < 0.3 && random() < 0.025) {
      this.alpha += random(0.4);
    }
  }

  render() {
    lsCtx.save();

    lsCtx.scale(2, 1);

    lsCtx.beginPath();
    lsCtx.arc(this.x / 2, this.y, this.size, 2 * Math.PI, false);
    lsCtx.closePath();
    lsCtx.restore();

    lsCtx.filter = `blur(${this.size}px)`;
    lsCtx.fillStyle = `rgba(100, 100, 100, ${this.alpha})`;
    lsCtx.fill();
    lsCtx.shadowColor = "#999999";
    lsCtx.shadowBlur = this.size;
  }
}

class CloudLightning {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size * 3 * random(2) + 10;
    this.alpha = 1;
  }

  animate() {
    this.alpha -= FADE_INCREMENT;
  }

  render() {
    clCtx.save();

    clCtx.scale(2.5, 1);

    clCtx.beginPath();
    clCtx.arc(this.x / 2.5, this.y, this.size, 2 * Math.PI, false);
    clCtx.restore();

    clCtx.filter = `blur(${this.size}px)`;
    clCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    clCtx.fill();
    clCtx.shadowColor = "#eeeeff";
    clCtx.shadowBlur = this.size * 8 + 50;
  }
}

const updateCanvasSize = () => {
  stageWidth = window.innerWidth;
  stageHeight = window.innerHeight;

  lightningCanvas.width = stageWidth;
  lightningCanvas.height = stageHeight;

  cloudLightningCanvas.width = stageWidth;
  cloudLightningCanvas.height = stageHeight;

  lightningSheetCanvas.width = stageWidth;
  lightningSheetCanvas.height = stageHeight * 0.8;
};

$(window).on("mousedown", (e) => {
  lightning.push(new Lightning(e.clientX, e.clientY));
});

updateCanvasSize();
$(window).resize(updateCanvasSize);

// create forest
const $tree = $(".tree");
for (let i = 0; i < 150; i++) {
  $tree
    .clone()
    .appendTo("body")
    .css({
      top: `${random(40) + 30}%`,
      left: random(stageWidth * 0.7, true),
      transform: `scale(${random(0.5) + 0.5}) scaleX(${
        random() > 0.5 ? -1 : 1
      })`,
      display: "inline"
    });
}

// watch toggle
$("#cloudInput").on("click", function () {
  HAS_CLOUD_EFFECTS = $(this).is(":checked");
});

setTimeout(() => {
  $(".toggles").fadeIn();
}, 6000);

lightning.push(new Lightning(400, 100));
loop();
