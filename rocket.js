export let rocket = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 100,
    width: 200,
    height: 100,
    velocityX: 0,
    velocityY: 0,
    acceleration: 8.95,
    friction: 0.98,
    image: new Image()
};
rocket.image.src = 'rocket2.png';

export function updateRocket() {
    rocket.velocityX *= rocket.friction;
    rocket.velocityY *= rocket.friction;

    rocket.x += rocket.velocityX;
    rocket.y += rocket.velocityY;

    rocket.x = Math.max(0, Math.min(window.innerWidth - rocket.width, rocket.x));
    rocket.y = Math.max(0, Math.min(window.innerHeight - rocket.height, rocket.y));
}

export function drawRocket(ctx) {
    ctx.drawImage(rocket.image, rocket.x, rocket.y, rocket.width, rocket.height);
}