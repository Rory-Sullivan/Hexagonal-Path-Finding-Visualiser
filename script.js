/**
 * Description
 */

// Global variables
const pi = Math.PI;
const hexSize = 20; // Should be divisible by 2
const hexYDim = Math.floor(hexSize * (Math.sqrt(3) / 2)); // y-axis dimension
let m, n; // grid size

let grid; // Matrix for storing information about our grid.

/**
 * Creates the background grid for our path finding.
 */
function setup() {
    window.bgCanvas = document.getElementById('background');
    window.bgCtx = bgCanvas.getContext('2d');
    window.canvas = document.getElementById('animation');
    window.ctx = canvas.getContext('2d');

    resize();

    // Background
    bgCtx.fillStyle = 'grey';
    bgCtx.fillRect(0, 0, w, h);

    // Draw hexagons
    m = Math.floor((h - hexYDim) / (hexYDim * 2)); // no. of rows
    n = Math.floor((w - hexSize / 2) / (hexSize * 1.5)); // no. of columns
    let xPos, yPos;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (j % 2 === 0) {
                xPos = (j / 2) * (hexSize * 3);
                yPos = hexYDim + i * (2 * hexYDim);
            } else {
                xPos = hexSize * (3 / 2) + ((j - 1) / 2) * (hexSize * 3);
                yPos = 2 * hexYDim + i * (2 * hexYDim);
            }
            drawHex(xPos, yPos, bgCtx);
        }
    }

    // Create a grid matrix
    grid = Array(m)
        .fill()
        .map(() => Array(n).fill(0));

    window.addEventListener('resize', setup, false);
    window.requestAnimationFrame(animate);
}

/**
 * Loops on every frame refresh.
 */
function animate() {
    window.requestAnimationFrame(animate);
}

/**
 * Resizes our canvases to fit the window.
 */
function resize() {
    window.w = innerWidth;
    window.h = innerHeight;
    bgCanvas.width = w;
    bgCanvas.height = h;
    canvas.width = w;
    canvas.height = h;
}

/**
 * Draws a hexagon with the input position as the left corner.
 */
function drawHex(x, y, ctx, fill = 'white') {
    ctx.save();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = fill;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + hexSize / 2, y - hexYDim);
    ctx.lineTo(x + hexSize * (3 / 2), y - hexYDim);
    ctx.lineTo(x + hexSize * 2, y);
    ctx.lineTo(x + hexSize * (3 / 2), y + hexYDim);
    ctx.lineTo(x + hexSize / 2, y + hexYDim);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}
