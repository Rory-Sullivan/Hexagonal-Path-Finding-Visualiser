/**
 * TODO: Description
 */

/* global Dijkstra, AStar, BiasedAStar */

/**
 * Global variables
 * */
// Hexagons
const hexSize = 16; // Should be divisible by 2
const hexYDim = Math.floor(hexSize * (Math.sqrt(3) / 2)); // y-axis dimension
let hexes = [];

// Grid matrix.  Stores information about the grid.
let m;
let n; // grid size
let grid;
let start = [];
let end = [];

// Document elements
let bgCanvas;
let canvas;
let bgCtx;
let ctx;
let instructions;
let w;
let h; // width and height of canvas.

// Action for adding or removing walls
let action = 'adding';

// Animation
let animationId;
let d;
const delay = 33;

/**
 * Update display.
 */
function animate() {
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j].fill !== 0) {
        hexes[i][j].draw(ctx);
      }
    }
  }
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

function addWall(event) {
  const [row, col] = getCursorPosition(event);

  if (
    (row === start[0] && col === start[1]) ||
    (row === end[0] && col === end[1])
  ) {
    return;
  }
  if (row < 0 || row > m - 1 || col < 0 || col > n - 1) {
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

function addWallEnd() {
  clearInterval(animationId);
  animate();
  canvas.removeEventListener('mousemove', addWall);
  window.removeEventListener('mouseup', addWallEnd);
}

function addWallBegin(event) {
  const [row, col] = getCursorPosition(event);

  if (row < 0 || row > m - 1 || col < 0 || col > n - 1) {
    return;
  }

  if (grid[row][col] === 0) {
    action = 'adding';
  } else {
    action = 'removing';
  }

  animationId = setInterval(animate, 33);

  addWall(event);
  canvas.addEventListener('mousemove', addWall);
  window.addEventListener('mouseup', addWallEnd);
}

function addEnd(event) {
  end = getCursorPosition(event);

  if (end[0] < 0 || end[0] > m - 1 || end[1] < 0 || end[1] > n - 1) {
    end = [];
    return;
  }
  if (end[0] === start[0] && end[1] === start[1]) {
    end = [];
    return;
  }

  hexes[end[0]][end[1]].fill = 'red';
  grid[end[0]][end[1]] = 0;

  animate();

  canvas.removeEventListener('mousedown', addEnd);
  canvas.addEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Add walls';
}

function addStart(event) {
  start = getCursorPosition(event);

  if (start[0] < 0 || start[0] > m - 1 || start[1] < 0 || start[1] > n - 1) {
    start = [];
    return;
  }

  hexes[start[0]][start[1]].fill = 'green';
  grid[start[0]][start[1]] = 0;

  animate();

  canvas.removeEventListener('mousedown', addStart);
  canvas.addEventListener('mousedown', addEnd);
  instructions.innerHTML = 'Select end position';
}

// eslint-disable-next-line no-unused-vars
function reset() {
  canvas.removeEventListener('mousedown', addWallBegin);

  start = [];
  end = [];

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      grid[i][j] = 0;
      hexes[i][j].fill = 'white';
    }
  }
  animate();

  canvas.addEventListener('mousedown', addStart);
  instructions.innerHTML = 'Select start position';
}

function animateSteps() {
  const checkedNodes = d.step();
  if (checkedNodes) {
    for (let i = 0; i < checkedNodes.length; i += 1) {
      const node = checkedNodes[i];
      if (!node.isStart && !node.isEnd) {
        hexes[node.row][node.col].fill = 'paleGreen';
      }
    }
  }

  if (d.pathFound) {
    if (d.noPath) {
      // eslint-disable-next-line no-alert
      window.alert('No path possible');
    } else {
      for (let i = 1; i < d.path.length - 1; i += 1) {
        const node = d.path[i];
        hexes[node.row][node.col].fill = 'lightBlue';
      }
    }
    canvas.addEventListener('mousedown', addWallBegin);
    instructions.innerHTML = 'Done!';
  } else {
    setTimeout(animateSteps, delay);
  }
  animate();
}

// eslint-disable-next-line no-unused-vars
function runAlgorithm(algorithm) {
  if (start.length === 0) {
    // eslint-disable-next-line no-alert
    window.alert('Please select a starting point');
    return;
  }
  if (end.length === 0) {
    // eslint-disable-next-line no-alert
    window.alert('Please select an end point');
    return;
  }

  canvas.removeEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Calculating...';

  if (d) {
    for (let i = 0; i < m; i += 1) {
      for (let j = 0; j < n; j += 1) {
        const hex = hexes[i][j];
        if (hex.fill === 'paleGreen' || hex.fill === 'lightBlue') {
          hex.fill = 'white';
        }
      }
    }
  }

  switch (algorithm) {
    case 'dijkstra':
      d = new Dijkstra(grid, start, end);
      break;

    case 'aStar':
      d = new AStar(grid, start, end);
      break;

    case 'biasedAStar':
      d = new BiasedAStar(grid, start, end);
      break;

    default:
      throw new Error('Not a valid algorithm');
  }

  setTimeout(animateSteps, delay);
}

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

  draw(cnt) {
    const context = cnt;

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
  instructions = document.getElementById('instructions');

  w = document.getElementById('canvasContainer').offsetWidth;
  h = document.getElementById('canvasContainer').offsetHeight;
  bgCanvas.width = w;
  bgCanvas.height = h;
  canvas.width = w;
  canvas.height = h;

  // Background
  bgCtx.fillStyle = 'grey';
  bgCtx.fillRect(0, 0, w, h);

  // Add hexagons to our matrix grid and draw them.
  m = Math.floor((h - hexYDim) / (hexYDim * 2)); // no. of rows
  n = Math.floor((w - hexSize / 2) / (hexSize * 1.5)); // no. of columns

  grid = [];
  hexes = [];

  for (let i = 0; i < m; i += 1) {
    const gridRow = [];
    const hexesRow = [];
    for (let j = 0; j < n; j += 1) {
      gridRow.push(0);
      hexesRow.push(new Hex(i, j));
      hexesRow[j].draw(bgCtx);
    }
    grid.push(gridRow);
    hexes.push(hexesRow);
  }

  canvas.addEventListener('mousedown', addStart);
  // eslint-disable-next-line no-use-before-define
  window.addEventListener('resize', resize, false);
}

/**
 * Resizes our canvases to fit the window.
 */
function resize() {
  canvas.removeEventListener('mousedown', addWallBegin);

  start = [];
  end = [];

  setup();
  instructions.innerHTML = 'Select start position';
}
