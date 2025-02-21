import { entityTypes } from './entityTypes.js';

// Create the heart image ONCE, outside the function
const heartImg = new Image();
heartImg.src = 'heart.png'; 

export function drawLives(ctx, lives) {
    const heartSize = 30;
    const spacing = 10;
    let x =spacing;
    const y = 60+spacing;

    for (let i = 0; i < lives; i++) {
        ctx.drawImage(heartImg, x, y, heartSize, heartSize); // Use the existing image
        x += heartSize + spacing;
    }
}

export function drawEntities(ctx, gameOver, entities, lives) { // Add gameOver, entities, and lives as arguments
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
            case entityTypes.NOTE:
            case entityTypes.OBSTACLE:
                ctx.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
                break;
            // case entityTypes.REWARD:
            //     ctx.fillStyle = 'blue';
            //     ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
            //     break;
        }
    });

    drawLives(ctx, lives);
}