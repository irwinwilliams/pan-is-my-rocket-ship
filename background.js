export function setupCanvas() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return { canvas, ctx };
}

let background = {
    image: new Image(),
    x: 0,
    speed: 1
};
background.image.src = 'space_background.jpg';

export function drawBackground(ctx, canvas) {
    background.x -= background.speed;
    if (background.x <= -canvas.width) {
        background.x = 0;
    }
    ctx.drawImage(background.image, background.x, 0, canvas.width, canvas.height);
    ctx.drawImage(background.image, background.x + canvas.width, 0, canvas.width, canvas.height);
}