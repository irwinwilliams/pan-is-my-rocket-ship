//gameManager.js
import * as gameVariables from './gameVariables.js';
import { rocket } from '../rocket.js';

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

const tryAgain = document.createElement('button');
tryAgain.textContent = 'Try again, intrepid explorer!';
tryAgain.style.marginTop = '10px';
tryAgain.style.padding = '10px 20px';
tryAgain.style.backgroundColor = 'green';
tryAgain.style.color = 'white';
tryAgain.style.border = 'none';
tryAgain.style.cursor = 'pointer';
tryAgain.addEventListener('click', () => {
    resetGame();
});

banner.appendChild(tryAgain);


export function showGameOverBanner() {
    if (banner) {
        document.body.appendChild(banner);
    }
    banner.style.display = 'block';
    //document.body.appendChild(banner);
}

export function resetGame() {
    gameVariables.setLives(5);
    gameVariables.setGameOver(false);

    rocket.x = window.innerWidth / 2;
    rocket.y = window.innerHeight - 100;
    rocket.velocityX = 0;
    rocket.velocityY = 0;

    if (banner) {
        banner.style.display = 'none'; // Hide the banner
    }

    const infoConsole = document.getElementById('info-console');
    if (infoConsole) {
        infoConsole.textContent = ''; // Clear the info console's content
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