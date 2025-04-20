import {
  setupCanvas,
  drawBackground,
  currentLevel,
  changeLevel,
  getLevelConfig,
} from "./background.js";
import { rocket, updateRocket, drawRocket } from "./rocket.js";
import { setupControls, updateTouchVelocity } from "./controls.js";
import {
  updateEntities,
  drawEntities,
  entities,
  checkLevelChange,
} from "./entities/entities.js"; // Import entities
import { gameOver, lives, score } from "./entities/gameVariables.js";
let canvas, ctx;

import { imageLoader } from "./imageLoader.js";

document.addEventListener("DOMContentLoaded", async () => {
  await imageLoader.loadAll();
  ({ canvas, ctx } = setupCanvas());
  setupControls(rocket);
  gameLoop();
});

function update() {
  updateRocket();
  updateEntities(ctx, isSoundOn);

  // Check for level change
  const nextLevel = checkLevelChange();
  if (nextLevel !== null) {
    changeLevel(nextLevel);
    resetForNewLevel();
  }
}

function resetForNewLevel() {
  // Reset rocket position and other game elements if necessary
  rocket.x = canvas.width / 2;
  rocket.y = canvas.height / 2;
  rocket.velocityX = 0;
  rocket.velocityY = 0;
}

const scoreConsole = document.getElementById("score-console");

function draw() {
  // Display score
  scoreConsole.textContent = "Score: " + score;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx, canvas);

  drawEntities(ctx, gameOver, entities, lives); // Pass gameOver, entities, and lives to drawEntities
  drawRocket(ctx);
}

let isGamePaused = false; 
let animationId; // To store the animation frame ID
let isSoundOn = true; // Add sound toggle variable



// Event listener for the pause button
document.getElementById("pause-button").addEventListener("click", function () {
  isGamePaused = !isGamePaused;
  this.textContent = isGamePaused ? "Resume" : "Pause"; // Change button text
});

// Event listener for the sound toggle button
const soundToggleButton = document.getElementById("sound-toggle");
soundToggleButton.addEventListener("click", function () {
  isSoundOn = !isSoundOn;
  this.textContent = isSoundOn ? "Sound: On" : "Sound: Off";
});

function gameLoop() {
  if (!isGamePaused) {
    update();
    updateTouchVelocity(); // *** Add this line ***
    draw();
  }
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Example of how to add active state to the segment.
document
  .getElementById("up-segment")
  .addEventListener("touchstart", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

document
  .getElementById("down-segment")
  .addEventListener("touchstart", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

document
  .getElementById("left-segment")
  .addEventListener("touchstart", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

document
  .getElementById("right-segment")
  .addEventListener("touchstart", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

//repeat for mouse down events if needed.
document
  .getElementById("up-segment")
  .addEventListener("mousedown", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

document
  .getElementById("down-segment")
  .addEventListener("mousedown", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });

document
  .getElementById("left-segment")
  .addEventListener("mousedown", function () {
    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 100);
  });