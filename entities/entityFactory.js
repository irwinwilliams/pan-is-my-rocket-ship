import { entityTypes } from './entityTypes.js';
import { songLines } from './gameVariables.js';

import { 
    obstacleMaxSize, 
    obstacleMinSize
} from './gameVariables.js';

export function createObstacle() {
    const size = Math.random() * (obstacleMaxSize - obstacleMinSize) + obstacleMinSize;
    const y = Math.random() * (window.innerHeight - size);

    let opps = {
        x: window.innerWidth,
        y: y,
        width: size,
        height: size,
        type: entityTypes.OBSTACLE,
        image: new Image()
    };
    opps.image.src = 'obstacle.png';
    return opps;
}

export function createPowerup() {
    const types = [entityTypes.POWERUP_LIFE, 
        entityTypes.POWERUP_SPEED, 
        entityTypes.POWERUP_LYRIC];
    //const type = types[Math.floor(Math.random() * types.length)];
    const type= entityTypes.POWERUP_LYRIC;
    const size = 40;
    const y = Math.random() * (window.innerHeight - size);

    const powerup = {
        x: window.innerWidth,
        y: y,
        width: size,
        height: size,
        type: type,
        image: new Image()
    };

    switch (type) {
        case entityTypes.POWERUP_LIFE:
            powerup.image.src = 'power-up.png';
            break;
        case entityTypes.POWERUP_SPEED:
            powerup.image.src = 'speed-up.png';
            break;
        case entityTypes.POWERUP_LYRIC:
            powerup.displayTime = 100; // Display for 100 frames (adjust as needed)
            powerup.lyric = songLines[Math.floor(Math.random() * songLines.length)]; // Add this line
            powerup.image.src = 'lyric-powerup.png';
            break;
        case entityTypes.NOTE:
            powerup.image.src = 'note.png';
            break;
    }

    return powerup;
}