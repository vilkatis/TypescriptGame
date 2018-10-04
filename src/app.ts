import { Circle } from './circle';

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.style.cssText = 'position: absolute;width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;';
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

function redraw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
}

function initialize() {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    redraw();

    let circle: Circle = new Circle(400, 400, 100, 5, 'blue');

    circle.draw(ctx);
}

window.onload = () => {
    document.body.appendChild(canvas);
    initialize();
};
