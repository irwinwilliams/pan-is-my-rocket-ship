import { setupCanvas, drawBackground } from './background.js';
import { rocket, updateRocket, drawRocket } from './rocket.js';
import { setupControls } from './controls.js';
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

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});