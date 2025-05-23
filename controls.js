import { entities } from './entities/entities.js'; // Import the entities array
import { entityTypes } from './entities/entityTypes.js'; // Import entity types
import { rocket } from './rocket.js'; // Import the rocket

export function setupControls(rocket) {
    let keys = {};

    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
        handleMovement(rocket, keys);
    });

    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });

    // Add touch event listeners for mobile
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    const shootButton = document.getElementById('shoot-button');
    shootButton.addEventListener('touchstart', createNote); // Shoot on touch

    const upButton = document.getElementById('up-segment');
    upButton.addEventListener('touchstart', () => rocket.velocityY -= rocket.acceleration);
    upButton.addEventListener('touchend', () => rocket.velocityY = 0);

    const downButton = document.getElementById('down-segment');
    downButton.addEventListener('touchstart', () => rocket.velocityY += rocket.acceleration);
    downButton.addEventListener('touchend', () => rocket.velocityY = 0);

    // Add listeners for left and right buttons
    const leftButton = document.getElementById('left-segment');
    leftButton.addEventListener('touchstart', () => rocket.velocityX -= rocket.acceleration);
    leftButton.addEventListener('touchend', () => rocket.velocityX = 0);

    const rightButton = document.getElementById('right-segment');
    rightButton.addEventListener('touchstart', () => rocket.velocityX += rocket.acceleration);
    rightButton.addEventListener('touchend', () => rocket.velocityX = 0);


}

function handleTouchStart(event) {
    console.log("touch start!")
    const touchX = event.touches.clientX;
    const halfScreenWidth = window.innerWidth / 2;

    if (touchX < halfScreenWidth) {
        // Left side touch - Shoot
        createNote();
    } else {
        // Right side touch - Up or Down
        const touchY = event.touches.clientY;
        const halfScreenHeight = window.innerHeight / 2;

        if (touchY < halfScreenHeight) {
            rocket.velocityY -= rocket.acceleration;
        } else {
            rocket.velocityY += rocket.acceleration;
        }

        // Add logic for left and right touch
        const touchX = event.touches.clientX;
        const halfScreenWidth = window.innerWidth / 2;
        const rightSideQuarterWidth = halfScreenWidth / 2; // Divide the right side into two halves

        if (touchX < halfScreenWidth + rightSideQuarterWidth) {
            // Left half of the right side - Left
            rocket.velocityX -= rocket.acceleration;
        } else {
            // Right half of the right side - Right
            rocket.velocityX += rocket.acceleration;
        }
    }
    event.preventDefault(); // Prevent default touch behavior like scrolling

}

function handleTouchEnd(event) {
    // Reset vertical velocity when touch ends
    //rocket.velocityY = 0;
    //rocket.velocityX = 0;
}

// Add a new function to continuously update velocity based on active touches
export function updateTouchVelocity() {
    if (isTouchingUp) {
      rocket.velocityY -= rocket.acceleration;
    }
    if (isTouchingDown) {
      rocket.velocityY += rocket.acceleration;
    }
    if (isTouchingLeft) {
      rocket.velocityX -= rocket.acceleration;
    }
    if (isTouchingRight) {
      rocket.velocityX += rocket.acceleration;
    }
  }
  
  // Add variables to track active touches
  let isTouchingUp = false;
  let isTouchingDown = false;
  let isTouchingLeft = false;
  let isTouchingRight = false;
  
  // Update the touch event handlers to set these variables
  const upButton = document.getElementById('up-segment');
  upButton.addEventListener('touchstart', () => isTouchingUp = true);
  upButton.addEventListener('touchend', () => isTouchingUp = false);
  
  const downButton = document.getElementById('down-segment');
  downButton.addEventListener('touchstart', () => isTouchingDown = true);
  downButton.addEventListener('touchend', () => isTouchingDown = false);
  
  const leftButton = document.getElementById('left-segment');
  leftButton.addEventListener('touchstart', () => isTouchingLeft = true);
  leftButton.addEventListener('touchend', () => isTouchingLeft = false);
  
  const rightButton = document.getElementById('right-segment');
  rightButton.addEventListener('touchstart', () => isTouchingRight = true);
  rightButton.addEventListener('touchend', () => isTouchingRight = false);

function handleMovement(rocket, keys) {
    if (keys['ArrowRight'] || keys['d']) rocket.velocityX += rocket.acceleration;
    if (keys['ArrowLeft'] || keys['a']) rocket.velocityX -= rocket.acceleration;
    if (keys['ArrowUp'] || keys['w']) rocket.velocityY -= rocket.acceleration;
    if (keys['ArrowDown'] || keys['s']) rocket.velocityY += rocket.acceleration;

    if (keys[' ']) { // Check for spacebar
        createNote();
    }
}

function createNote() {
    const powerup = {
        x: rocket.x + rocket.width / 2, // Start at the rocket's position
        y: rocket.y,
        width: 50,
        height: 50,
        type: entityTypes.NOTE,
        image: new Image()
    };
    powerup.image.src = 'note.png';
    entities.push(powerup);
}


