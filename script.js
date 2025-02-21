document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let background = {
        image: new Image(),
        x: 0,
        speed: 1
    };
    background.image.src = 'space_background.jpg';

    let rocket = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        width: 50,
        height: 100,
        velocityX: 0,
        velocityY: 0,
        acceleration: 0.2,
        friction: 0.99,
        image: new Image()
    };
    rocket.image.src = 'rocket.png';

    let keys = {};
    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });

    function update() {
        if (keys['ArrowRight'] || keys['d']) rocket.velocityX += rocket.acceleration;
        if (keys['ArrowLeft'] || keys['a']) rocket.velocityX -= rocket.acceleration;
        if (keys['ArrowUp'] || keys['w']) rocket.velocityY -= rocket.acceleration;
        if (keys['ArrowDown'] || keys['s']) rocket.velocityY += rocket.acceleration;

        rocket.velocityX *= rocket.friction;
        rocket.velocityY *= rocket.friction;

        rocket.x += rocket.velocityX;
        rocket.y += rocket.velocityY;

        rocket.x = Math.max(0, Math.min(canvas.width - rocket.width, rocket.x));
        rocket.y = Math.max(0, Math.min(canvas.height - rocket.height, rocket.y));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background.image, background.x, 0, canvas.width, canvas.height);
        ctx.drawImage(background.image, background.x + canvas.width, 0, canvas.width, canvas.height);
        ctx.drawImage(rocket.image, rocket.x, rocket.y, rocket.width, rocket.height);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    rocket.image.onload = () => {
        gameLoop();
    };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
