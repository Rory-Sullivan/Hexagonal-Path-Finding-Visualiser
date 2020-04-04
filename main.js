import Grid from './grid/Grid.js';
import { addStart, addEnd } from './userInterface/addStartEnd.js';
import { updateDisplay, drawBackground } from './userInterface/display.js';
import { addWallBegin } from './userInterface/addWalls.js';

// Hexagons
const hexSize = {
  width: 16, // Should be divisible by 2
  height: Math.floor(this.width * (Math.sqrt(3) / 2)),
};

// Grid matrix
let grid;

// Document elements
const bgCanvas = document.getElementById('background');
const bgContext = bgCanvas.getContext('2d');
const animationCanvas = document.getElementById('animation');
const animationContext = animationCanvas.getContext('2d');
const instructions = document.getElementById('instructions');

// Animation
const animationDelay = 33; // milliseconds

function reset() {
  animationCanvas.removeEventListener('mousedown', addWallBegin);

  grid.forEach((row) => {
    row.forEach((tile) => {
      tile.reset();
    });
  });

  updateDisplay(grid, animationContext);

  animationCanvas.addEventListener('mousedown', addStart);
  instructions.innerHTML = 'Select start position';
}

function updateCanvasSize() {
  const w = document.getElementById('canvasContainer').offsetWidth;
  const h = document.getElementById('canvasContainer').offsetHeight;
  bgCanvas.width = w;
  bgCanvas.height = h;
  animationCanvas.width = w;
  animationCanvas.height = h;

  return [w, h];
}

function updateGridSize(w, h) {
  const rows = Math.floor((h - hexSize.height) / (hexSize.height * 2));
  const cols = Math.floor((w - hexSize.width / 2) / (hexSize.width * 1.5));

  grid = new Grid(rows, cols, hexSize);
}

/**
 * Resizes our canvases to fit the window.
 */
function resize() {
  animationCanvas.removeEventListener('mousedown', addWallBegin);

  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground(grid, bgContext);

  instructions.innerHTML = 'Select start position';
}

/**
 * Creates the background grid for our path finding.
 */
function setup() {
  document.getElementById('resetButton').onclick = reset();

  document.getElementById('dijkstraButton').onclick = reset();

  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground(grid, bgContext);

  animationCanvas.addEventListener('mousedown', addStart);
  window.addEventListener('resize', resize, false);
}

setup();
