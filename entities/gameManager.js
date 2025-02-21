//gameManager.js
import * as gameVariables from './gameVariables.js';
import {rocket} from '../rocket.js';

export function showGameOverBanner() {
    const banner = document.createElement('div');
    banner.textContent = "Don't stop practicing!";
    banner.style.position = 'absolute';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.backgroundColor = 'black';
    banner.style.color = 'white';
    banner.style.padding = '20px';
    banner.style.fontSize = '24px';
    banner.style.fontFamily = 'Arial';

    const button = document.createElement('button');
    button.textContent = 'Try again, intrepid explorer!';
    button.style.marginTop = '10px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
        resetGame();
    });

    banner.appendChild(button);
    document.body.appendChild(banner);
}

export function resetGame() {
    gameVariables.setLives(5);
    gameVariables.setGameOver(false);

    rocket.x = window.innerWidth / 2;
    rocket.y = window.innerHeight - 100;
    rocket.velocityX = 0;
    rocket.velocityY = 0;
    const banner = document.querySelector('div');
    if (banner) {
        document.body.removeChild(banner);
    }
}

const startbutton = document.createElement('button');
startbutton.textContent = 'Start Game';
startbutton.style.position = 'absolute';
startbutton.style.top = '50%';
startbutton.style.left = '50%';
startbutton.style.transform = 'translate(-50%, -50%)';
startbutton.style.padding = '10px 20px';
startbutton.style.backgroundColor = 'green';
startbutton.style.color = 'white';
startbutton.style.border = 'none';
startbutton.style.cursor = 'pointer';
startbutton.addEventListener('click', () => {
    startGame();
});
document.body.appendChild(startbutton);

export function showStartGameButton() {
   
}

export function startGame() {
    gameVariables.setGameStarted(true);
    if (startbutton) {
        document.body.removeChild(startbutton);
    }
}