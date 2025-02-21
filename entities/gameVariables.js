// gameVariables.js
export let lives = 5;
export let gameOver = false;
export let gameStarted = false;
export let score = 0;

export function setScore(value) {
    score = value;
}

export function setGameStarted(value) {
    gameStarted = value;
}

export function setLives(value) {
    lives = value;
}


export function setGameOver(value) {
    gameOver = value;
}


export const obstacleSettings = {
    speed: 5,
    minSize: 30,
    maxSize: 80,
    interval: 1000
};

export const powerupSettings = {
    speed: 3,
    interval: 5000
};

export const musicLyricSound = new Audio('game-bonus-144751.mp3');
export const obstacleHitSound = new Audio('video-game-bio-gun-sfx-203965.mp3');
export const obstacleMinSize = 30;
export const obstacleMaxSize = 80;



export const songLines = [
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

// Consider adding these if multiple files directly manipulate them:
// export const entities =; 
// export let lastObstacleTime = 0;
// export let lastPowerupTime = 0;