import { entityTypes } from './entityTypes.js';
import { rocket } from '../rocket.js'; // Update the path
import { createObstacle, createPowerup } from './entityFactory.js';
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

entities.push({
    x: 1500,
    y: 200,
    width: 100,
    height: 100,
    image: new Image(),
    type: entityTypes.PLANET
});
entities[entities.length - 1].image.src = 'planet1.png';

entities.push({
    x: 2000,
    y: 400,
    width: 80,
    height: 80,
    image: new Image(),
    type: entityTypes.PLANET
});
entities[entities.length - 1].image.src = 'planet2.png';

entities.push({
    x: 2500,
    y: 350,
    width: 120,
    height: 120,
    image: new Image(),
    type: entityTypes.PLANET
});
entities[entities.length - 1].image.src = 'planet3.png';



const obstacleSpeed = 5;
let lastObstacleTime = 0;
const obstacleInterval = 1000;

const powerupSpeed = 3;
let lastPowerupTime = 0;
const powerupInterval = 5000;



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