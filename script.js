/**
 * TODO: Description
 */

/**
 * Global variables
 * */
const pi = Math.PI; // TODO: remove this

// Hexagons
const hexSize = 16; // Should be divisible by 2
const hexYDim = Math.floor(hexSize * (Math.sqrt(3) / 2)); // y-axis dimension
let hexes = [];

// Grid matrix.  Stores information about the grid.
let m, n; // grid size
let grid = [];
let start = [];
let end = [];

// Canvas elements
let bgCanvas, canvas;
let bgCtx, ctx;

// Action for adding or removing walls
let action = 'adding';

// Animation
let animationId;

/**
 * Object for storing information about our hexagons.
 */
class Hex {
    constructor(row, col) {
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
        context.save();

        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillStyle = this.fill;

        context.beginPath();
        context.moveTo(this.xPos, this.yPos);
        context.lineTo(this.xPos + hexSize / 2, this.yPos - hexYDim);
        context.lineTo(this.xPos + hexSize * (3 / 2), this.yPos - hexYDim);
        context.lineTo(this.xPos + hexSize * 2, this.yPos);
        context.lineTo(this.xPos + hexSize * (3 / 2), this.yPos + hexYDim);
        context.lineTo(this.xPos + hexSize / 2, this.yPos + hexYDim);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    }
}

/**
 * Creates the background grid for our path finding.
 */
function setup() {
    bgCanvas = document.getElementById('background');
    bgCtx = bgCanvas.getContext('2d');
    canvas = document.getElementById('animation');
    ctx = canvas.getContext('2d');

    resize();

    // Background
    bgCtx.fillStyle = 'grey';
    bgCtx.fillRect(0, 0, w, h);

    // Add hexagons to our matrix grid and draw them.
    m = Math.floor((h - hexYDim) / (hexYDim * 2)); // no. of rows
    n = Math.floor((w - hexSize / 2) / (hexSize * 1.5)); // no. of columns

    for (let i = 0; i < m; i++) {
        let gridRow = [];
        let hexesRow = [];
        for (let j = 0; j < n; j++) {
            gridRow.push(0);
            hexesRow.push(new Hex(i, j));
            hexesRow[j].draw(bgCtx);
        }
        grid.push(gridRow);
        hexes.push(hexesRow);
    }

    canvas.addEventListener('mousedown', addStart);
    // window.addEventListener('resize', setup, false);
}

/**
 * Update display.
 */
function animate() {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j].fill !== 0) {
                hexes[i][j].draw(ctx);
            }
        }
    }
}

/**
 * Resizes our canvases to fit the window.
 */
function resize() {
    window.w = document.getElementsByClassName(
        'canvasContainer'
    )[0].offsetWidth;
    window.h = document.getElementsByClassName(
        'canvasContainer'
    )[0].offsetHeight;
    bgCanvas.width = w;
    bgCanvas.height = h;
    canvas.width = w;
    canvas.height = h;
}

function runDijkstra() {
    if (start.length === 0) {
        window.alert('Please select a starting point');
        return;
    } else if (end.length === 0) {
        window.alert('Please select an end point');
        return;
    }

    canvas.removeEventListener('mousedown', addWallBegin);

    let [pathFound, path] = dijkstra(grid, start, end);

    if (pathFound) {
        for (let i = 1; i < path.length - 1; i++) {
            const node = path[i];
            hexes[node.row][node.col].fill = 'LightBlue';
            animate();
        }
    } else {
        window.alert('No path possible');
    }
}

function addStart(event) {
    start = getCursorPosition(event);

    hexes[start[0]][start[1]].fill = 'green';

    animate();

    canvas.removeEventListener('mousedown', addStart);
    canvas.addEventListener('mousedown', addEnd);
}

function addEnd(event) {
    end = getCursorPosition(event);

    hexes[end[0]][end[1]].fill = 'red';

    animate();

    canvas.removeEventListener('mousedown', addEnd);
    canvas.addEventListener('mousedown', addWallBegin);
}

function addWallBegin(event) {
    let [row, col] = getCursorPosition(event);

    if (grid[row][col] == 0) {
        action = 'adding';
    } else {
        action = 'removing';
    }

    animationId = setInterval(animate, 33);

    addWall(event);
    canvas.addEventListener('mousemove', addWall);
    window.addEventListener('mouseup', addWallEnd);
}

function addWall(event) {
    let [row, col] = getCursorPosition(event);

    if (
        (row === start[0] && col === start[1]) ||
        (row === end[0] && col === end[1])
    ) {
        return;
    }

    if (action === 'adding') {
        grid[row][col] = 1;
        hexes[row][col].fill = 'black';
    } else if (action === 'removing') {
        grid[row][col] = 0;
        hexes[row][col].fill = 'white';
    }
}

function addWallEnd(event) {
    clearInterval(animationId);
    animate();
    canvas.removeEventListener('mousemove', addWall);
    window.removeEventListener('mouseup', addWallEnd);
}

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Get column
    const col = Math.floor((x - hexSize * 0.25) / (hexSize * 1.5));

    // Get row
    let row;
    if (col % 2 === 0) {
        row = Math.floor(y / (hexYDim * 2));
    } else {
        row = Math.floor((y - hexYDim) / (hexYDim * 2));
    }

    return [row, col];
}

function reset() {
    start = [];
    end = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            grid[i][j] = 0;
            hexes[i][j].fill = 'white';
        }
    }
    animate();

    canvas.addEventListener('mousedown', addStart);
}
