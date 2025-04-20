import { entityTypes } from './entityTypes.js';
import { rocket } from '../rocket.js'; // Update the path
import { createObstacle, createPowerup, createPlanet } from './entityFactory.js';
import { updateObstaclesAndPowerups } from './entityUpdater.js';
import { drawEntities, drawLives } from './entityRenderer.js';
import { checkCollision } from './collisionDetector.js';
import { showGameOverBanner, resetGame, showStartGameButton, startGame } from './gameManager.js';

import { 
    lives, gameOver, gameStarted, 
    obstacleSettings, powerupSettings, 
    musicLyricSound, obstacleHitSound, 
    songLines 
} from './gameVariables.js';

export const entities = [];

for (let i = 0; i < 50; i++) {
    entities.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 3,
        type: entityTypes.STAR
    });
}



const obstacleSpeed = 5;
let lastObstacleTime = 0;
const obstacleInterval = 1000;

const powerupSpeed = 3;
let lastPowerupTime = 0;
const powerupInterval = 5000;

let lastPlanetTime = 0;
const planetInterval = 3000; // Create a planet every 3 seconds (adjust as needed)



export function updateEntities(ctx, isSoundOn) {
    if (gameOver) return;

    if (!gameStarted) { // Check if the game has started
        showStartGameButton(); // Call this only once, before the game starts
        return; // Exit the function after showing the button
    }

    const now = Date.now();
    if (now - lastObstacleTime > obstacleInterval) {
        entities.push(createObstacle());
        lastObstacleTime = now;
    }

    if (now - lastPowerupTime > powerupInterval) {
        entities.push(createPowerup());
        lastPowerupTime = now;
    }

    if (now - lastPlanetTime > planetInterval) {
        entities.push(createPlanet());
        lastPlanetTime = now;
    }

    updateObstaclesAndPowerups(entities, ctx, obstacleSpeed, lives, gameOver, obstacleHitSound, songLines, musicLyricSound, isSoundOn);
}

export {
    drawEntities,
    checkCollision,
    showGameOverBanner,
    resetGame,
    gameOver,
    lives
};