const width = 1300;
const height = 600;

const maxTimeBetweenLightning = 30;
const maxLightningPaths = 200;
const maxLightningThickness = 5;
const startingDistance = 30;
const maxBranches = 7;

function makeLightning(ctx, startingX, startingY, branches) {
    ctx.beginPath();
    const amntOfPaths = getRandomInt(maxLightningPaths);
    let lightningThickness = maxLightningThickness;
    let distance = startingDistance;
    let timeout = 80;
    let speed = timeout;
    let totalTime = 0;
    for (let i = 0; i < amntOfPaths; i++) {
        ctx.strokeStyle = `rgb(255,255,255)`;
        ctx.lineWidth = getRandomInt(lightningThickness);
        lightningThickness /= 1.2;
        setTimeout(() => {
            ctx.moveTo(startingX, startingY);
            let endingX = getRandomInt(distance) * negOrPos() + startingX;
            let endingY =  startingY + getRandomInt(distance * 2);
            distance /= 1.1;
            ctx.lineTo(endingX, endingY);
            startingX = endingX;
            startingY = endingY;
            ctx.stroke();
            if (branches < maxBranches && getRandomInt(maxLightningPaths / 6) == 1) {
                let time = makeLightning(ctx, startingX, startingY, branches + 1);
                totalTime += time;
            }
        }, timeout);
        speed /= 1.4;
        timeout += speed;
    }
    return timeout + totalTime;
}

function negOrPos() {
    return Math.round(Math.random()) == 0 ? -1 : 1;
}

function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

let prevHighestId = 0;

function createCanvasAndLightning() {
    const canvas = document.createElement('canvas');
    const body = document.getElementById("weatherAnimation");
    canvas.setAttribute('width', '1450px');
    canvas.setAttribute('height', '800px');
    canvas.className = 'myCanvas';
    ctx = canvas.getContext("2d");
    body.appendChild(canvas);
    const time = makeLightning(ctx, getRandomInt(width), getRandomInt(height / 3), 0);
    canvas.style.animationName = 'flash';
    canvas.style.animationDuration = time + "ms";
    setTimeout(() => {
        canvas.style.animationName = 'fadeOut';
    }, time);
    setTimeout(() => {
        canvas.remove();
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= prevHighestId; i--) {
              window.clearTimeout(i);
            }
            prevHighestId = highestId;
            setTimeout(createCanvasAndLightning, 4000);
        }, 0);
    }, time * 2);
}

// createCanvasAndLightning();