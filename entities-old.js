// ├── entities/
// │   ├── entityTypes.js
// │   ├── entityFactory.js
// │   ├── entityUpdater.js
// │   ├── entityRenderer.js
// │   ├── collisionDetector.js
// │   ├── gameManager.js
// │   └── entities.js

import { rocket } from './rocket.js';

const entityTypes = {
    STAR: 'star',
    PLANET: 'planet',
    OBSTACLE: 'obstacle',
    REWARD: 'reward',
    POWERUP_LIFE: 'powerup_life',
    POWERUP_SPEED: 'powerup_speed',
    POWERUP_LYRIC: 'powerup_lyric',
    NOTE: 'note'
};

const entities =[];

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

entities.push({
    x: 600,
    y: 400,
    width: 50,
    height: 50,
    type: entityTypes.OBSTACLE
});

entities.push({
    x: 1000,
    y: 350,
    width: 30,
    height: 30,
    type: entityTypes.REWARD
});

const songLines = [
    "I hopped into my rocket, We're off to space",
    "My smile’s so bright, like stars across my face",
    "The pans are lined up, ready to go",
    "Off to a planet, nobody else knows",
    "When I land, it's something new",
    "Every step, a melody comes through",
    "A Pan planet under my feet",
    "Every step making sounds so sweet",
    "Pan is my rocket ship, taking me high",
    "Into the stars, I’ll soar and fly",
    "10... 9... feel the bass kick in",
    "Escape velocity, the journey begins",
    "Pan is my rocket ship, into the sky",
    "Lifting my soul as the notes rise high"
];

let lives = 5;
let gameOver = false;

const obstacleMinSize = 30;
const obstacleMaxSize = 80;
const obstacleSpeed = 5;
let lastObstacleTime = 0;
const obstacleInterval = 1000; // 1 second

const powerupSpeed = 3;
let lastPowerupTime = 0;
const powerupInterval = 5000; // 5 seconds

const musicLyricSound = new Audio('game-bonus-144751.mp3');
const obstacleHitSound = new Audio('video-game-bio-gun-sfx-203965.mp3');

export function updateEntities(ctx) {
    if (gameOver) return;

    const now = Date.now();
    if (now - lastObstacleTime > obstacleInterval) {
        createObstacle();
        lastObstacleTime = now;
    }

    if (now - lastPowerupTime > powerupInterval) {
        createPowerup();
        lastPowerupTime = now;
    }

    for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i];

        if (entity.type === entityTypes.STAR) {
            entity.twinkle = entity.twinkle || Math.random() * 200;
            entity.twinkle--;
            if (entity.twinkle <= 0) {
                entity.visible =!entity.visible;
                entity.twinkle = Math.random() * 200;
            }
        }

        if (entity.type === entityTypes.OBSTACLE || entity.type.startsWith('powerup_')) {
            entity.x -= obstacleSpeed;

            if (entity.x + entity.width < 0) {
                entities.splice(i, 1);
            }

            if (checkCollision(entity)) {
                if (entity.type === entityTypes.OBSTACLE) {
                    obstacleHitSound.play();
                    lives--;

                    ctx.fillStyle = 'red';
                    ctx.beginPath();
                    ctx.arc(rocket.x + rocket.width / 2, rocket.y + rocket.height / 2, 50, 0, 2 * Math.PI);
                    ctx.fill();

                    if (lives === 0) {
                        gameOver = true;
                        showGameOverBanner();
                    }

                } else if (entity.type === entityTypes.REWARD) {
                    const randomLine = songLines[Math.floor(Math.random() * songLines.length)];
                    ctx.font = '16px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText(randomLine, entity.x, entity.y - 20);


                } else if (entity.type.startsWith('powerup_')) {
                    handlePowerup(entity, ctx);
                }

                entities.splice(i, 1);
            }
        }
    }
}

function createPowerup() {
    const types = [entityTypes.POWERUP_LIFE, entityTypes.POWERUP_SPEED, entityTypes.POWERUP_LYRIC];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = 40;
    const y = Math.random() * (window.innerHeight - size);

    entities.push({
        x: window.innerWidth,
        y: y,
        width: size,
        height: size,
        type: type,
        image: new Image()
    });

    switch (type) {
        case entityTypes.POWERUP_LIFE:
            entities[entities.length - 1].image.src = 'power-up.png';
            break;
        case entityTypes.POWERUP_SPEED:
            entities[entities.length - 1].image.src = 'speed-up.png';
            break;
        case entityTypes.POWERUP_LYRIC:
            entities[entities.length - 1].image.src = 'lyric-powerup.png';
            break;
        case entityTypes.NOTE:
            entities[entities.length - 1].image.src = 'note.png';
            break;
    }
}

function handlePowerup(powerup, ctx) {
    switch (powerup.type) {
        case entityTypes.POWERUP_LIFE:
            lives++;
            break;
        case entityTypes.POWERUP_SPEED:
            rocket.acceleration *= 1.5;
            break;
        case entityTypes.POWERUP_LYRIC:
            const randomLine = songLines[Math.floor(Math.random() * songLines.length)];
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(randomLine, powerup.x, powerup.y - 20);
            musicLyricSound.play();
            break;
    }
}

function drawLives(ctx) {
    const heartImg = new Image();
    heartImg.src = 'heart.png';

    const heartSize = 30;
    const spacing = 10;
    let x = spacing;
    const y = spacing;

    for (let i = 0; i < lives; i++) {
        ctx.drawImage(heartImg, x, y, heartSize, heartSize);
        x += heartSize + spacing;
    }
}

export function drawEntities(ctx) {
    if (gameOver) return;

    entities.forEach(entity => {
        switch (entity.type) {
            case entityTypes.STAR:
                if (entity.visible) {
                    ctx.fillStyle = 'yellow';
                    ctx.beginPath();
                    ctx.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
                break;
            case entityTypes.PLANET:
            case entityTypes.POWERUP_LIFE:
            case entityTypes.POWERUP_SPEED:
            case entityTypes.POWERUP_LYRIC:
                ctx.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
                break;
            case entityTypes.OBSTACLE:
                ctx.fillStyle = 'red';
                ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
                break;
            case entityTypes.REWARD:
                ctx.fillStyle = 'blue';
                ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
                break;
        }
    });

    drawLives(ctx);
}

function createObstacle() {
    const size = Math.random() * (obstacleMaxSize - obstacleMinSize) + obstacleMinSize;
    const y = Math.random() * (window.innerHeight - size);

    entities.push({
        x: window.innerWidth,
        y: y,
        width: size,
        height: size,
        type: entityTypes.OBSTACLE
    });
}

export function checkCollision(entity) {
    if (
        rocket.x < entity.x + entity.width &&
        rocket.x + rocket.width > entity.x &&
        rocket.y < entity.y + entity.height &&
        rocket.y + rocket.height > entity.y
    ) {
        return true;
    }
    return false;
}

function showGameOverBanner() {
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
    button.textContent = 'Try again, my intrepid explorer!';
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

function resetGame() {
    lives = 5;
    gameOver = false;
    rocket.x = window.innerWidth / 2;
    rocket.y = window.innerHeight - 100;
    rocket.velocityX = 0;
    rocket.velocityY = 0;
    const banner = document.querySelector('div');
    if (banner) {
        document.body.removeChild(banner);
    }
}