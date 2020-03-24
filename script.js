/**
 * Description
 */

// Global variables
const pi = Math.PI;
const hexSize = 20; // Should be divisible by 2
const hexYDim = Math.floor(hexSize * (Math.sqrt(3) / 2)); // y-axis dimension
let m, n; // grid size

let grid = []; // Matrix for storing information about our grid.
let start = { row: 0, col: 0 };
let finish = { row: 10, col: 10 };

/**
 * Object for storing information about our hexagons.
 */
class Hex {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        if (col % 2 === 0) {
            this.xPos = (col / 2) * (hexSize * 3);
            this.yPos = hexYDim + row * (2 * hexYDim);
        } else {
            this.xPos = hexSize * (3 / 2) + ((col - 1) / 2) * (hexSize * 3);
            this.yPos = 2 * hexYDim + row * (2 * hexYDim);
        }
        this.fill = 'white';
    }

    draw(context) {
        drawHex(this.xPos, this.yPos, context, this.fill);
    }
}

/**
 * Draws a hexagon with the input position as the left corner.
 */
function drawHex(x, y, ctx, fill) {
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

    // Add hexagons to our matrix grid and draw them.
    m = Math.floor((h - hexYDim) / (hexYDim * 2)); // no. of rows
    n = Math.floor((w - hexSize / 2) / (hexSize * 1.5)); // no. of columns

    for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(new Hex(i, j));
            row[j].draw(bgCtx);
        }
        grid.push(row);
    }

    grid[start.row][start.col].fill = 'green';
    grid[finish.row][finish.col].fill = 'red';

    window.addEventListener('resize', setup, false);
    window.requestAnimationFrame(animate);
}

/**
 * Loops on every frame refresh.
 */
function animate() {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j].fill !== 'white') {
                grid[i][j].draw(ctx);
            }
        }
    }

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
