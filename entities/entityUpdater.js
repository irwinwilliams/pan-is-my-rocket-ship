import { entityTypes } from './entityTypes.js';
import { rocket } from '../rocket.js';
import { showGameOverBanner } from './gameManager.js';
import { checkCollision, checkCollisionWith } from './collisionDetector.js';
import { songLines, lives, musicLyricSound, setLives, gameOver, setGameOver, setScore, score, powerUpSound, noteHitSound } from './gameVariables.js';


export function updateObstaclesAndPowerups(entities, ctx, obstacleSpeed, lives, gameOver, obstacleHitSound, songLines, musicLyricSound, isSoundOn) {
    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];

        // if (!gameOver && 
        //     (entity.type === entityTypes.OBSTACLE 
        //     || entity.type.startsWith('powerup_')
        //     || entity.type === entityTypes.NOTE)) {
        if (!gameOver) {

            if (entity.type === entityTypes.NOTE) {
                entity.x += obstacleSpeed; 
    
                // Remove the note if it goes off-screen
                if (entity.x > window.innerWidth) {
                    entities.splice(i, 1);
                }
                else
                {
                    // Check for collisions with obstacles
                    for (let j = entities.length - 1; j >= 0; j--) {
                        const otherEntity = entities[j];
                        if (otherEntity.type === entityTypes.OBSTACLE && checkCollisionWith(entity, otherEntity)) {
                            entities.splice(j, 1); // Remove obstacle
                            entities.splice(i, 1); // Remove note
                            setScore(score + 10); // Increase score
                            if (isSoundOn)
                            {
                                noteHitSound.play();
                            }
                            console.log("Score: " + score);
                            // Play a nice sound effect
                            break; 
                        }
                    }
                }
            } 
            else{     
                if (entity.x + entity.width < 0) {
                    entities.splice(i, 1);
                }
            }

            if (entity.type != entityTypes.NOTE)
            {
                entity.x -= obstacleSpeed;

                if (checkCollision(entity)) {
                    if (entity.type === entityTypes.OBSTACLE) {
                        if (isSoundOn)
                        {
                            obstacleHitSound.play();
                        }
                        setLives(lives-1);
                        console.log("Lives: " + lives);
    
                        ctx.fillStyle = 'red';
                        ctx.beginPath();
                        ctx.arc(rocket.x + rocket.width / 2, rocket.y + rocket.height / 2, 50, 0, 2 * Math.PI);
                        ctx.fill();
    
                        if (lives === 0) {
                            setGameOver(true);
                            showGameOverBanner();
                        }
    
                    } else if (entity.type === entityTypes.REWARD) {
                        const randomLine = songLines[Math.floor(Math.random() * songLines.length)];
                        ctx.font = '16px Arial';
                        ctx.fillStyle = 'white';
                        ctx.fillText(randomLine, entity.x, entity.y - 20);
    
                    } else if (entity.type.startsWith('powerup_')) {
                        handlePowerup(entity, ctx, isSoundOn);
                    }
    
                    entities.splice(i, 1);
                }
            }

            
        }
    }
}

function handlePowerup(powerup, ctx, isSoundOn) {
    if (isSoundOn) {
        powerUpSound.play(); // Play power-up sound
      }

    switch (powerup.type) {
        case entityTypes.POWERUP_LIFE:
            setLives(lives+1);
            break;
        case entityTypes.POWERUP_SPEED:
            rocket.acceleration *= 1.5;
            break;
        case entityTypes.POWERUP_LYRIC:
            const randomLine = songLines[Math.floor(Math.random() * songLines.length)];

            const consoleElement = document.getElementById('info-console');
            consoleElement.textContent = songLines[Math.floor(Math.random() * songLines.length)];
            consoleElement.style.display = 'block'; // Show the console

            //ctx.font = '16px Arial';
            //ctx.fillStyle = 'white';
            //ctx.fillText(randomLine, powerup.x, powerup.y - 20);
            //musicLyricSound.play();
            setTimeout(() => {
                consoleElement.style.display = 'none'; 
            }, 3000); // Hide after 3 seconds (adjust as needed)
            break;
    }
}