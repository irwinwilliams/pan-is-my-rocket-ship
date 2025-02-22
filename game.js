import { setupCanvas, drawBackground } from './background.js';
import { rocket, updateRocket, drawRocket } from './rocket.js';
import { setupControls, updateTouchVelocity } from './controls.js';
import { updateEntities, drawEntities, entities} from './entities/entities.js'; // Import entities
import { gameOver, lives, score } from './entities/gameVariables.js';
let canvas, ctx;


import {  imageLoader} from './imageLoader.js';


document.addEventListener('DOMContentLoaded', async () => {
  await imageLoader.loadAll(); // Load all images before starting the game
    ({ canvas, ctx } = setupCanvas());
    setupControls(rocket);
    gameLoop();
});

function update() {
    updateRocket();
    updateEntities(ctx);
}
const scoreConsole = document.getElementById('score-console');

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

// Event listener for the pause button
document.getElementById('pause-button').addEventListener('click', function() {
    isGamePaused =!isGamePaused; 
    this.textContent = isGamePaused? 'Resume': 'Pause'; // Change button text
});


function gameLoop() {
    if (!isGamePaused) {
        update();
        updateTouchVelocity(); // *** Add this line ***
        draw();
    }
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Example of how to add active state to the segment.
document.getElementById('up-segment').addEventListener('touchstart', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  document.getElementById('down-segment').addEventListener('touchstart', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  document.getElementById('left-segment').addEventListener('touchstart', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  document.getElementById('right-segment').addEventListener('touchstart', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  //repeat for mouse down events if needed.
  document.getElementById('up-segment').addEventListener('mousedown', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  document.getElementById('down-segment').addEventListener('mousedown', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  });
  
  document.getElementById('left-segment').addEventListener('mousedown', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 100);
  }
  );