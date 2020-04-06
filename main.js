/* globals hexSize, grid, bgCanvas, bgContext, animationCanvas, animationContext, instructions */

import Grid from './grid/Grid.js';
import addStart from './userInterface/addStartEnd.js';
import { updateDisplay, drawBackground } from './userInterface/display.js';
import addWallBegin from './userInterface/addWalls.js';

// Hexagons
window.hexSize = { width: 16 }; // Should be divisible by 2
hexSize.height = Math.floor(hexSize.width * (Math.sqrt(3) / 2));

// Grid matrix
window.grid = [];

// Document elements
window.bgCanvas = document.getElementById('background');
window.bgContext = bgCanvas.getContext('2d');
window.animationCanvas = document.getElementById('animation');
window.animationContext = animationCanvas.getContext('2d');
window.instructions = document.getElementById('instructions');

// Animation
window.animationDelay = 33; // milliseconds

function updateGridSize(w, h) {
  const rows = Math.floor((h - hexSize.height) / (hexSize.height * 2));
  const cols = Math.floor((w - hexSize.width / 2) / (hexSize.width * 1.5));

  // eslint-disable-next-line no-global-assign
  grid = new Grid(rows, cols, hexSize);
}

function reset() {
  animationCanvas.removeEventListener('mousedown', addWallBegin);

  grid.forEach((row) => {
    row.forEach((tile) => {
      tile.reset();
    });
  });

  updateDisplay(animationContext);

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

/**
 * Resizes our canvases to fit the window.
 */
function resize() {
  animationCanvas.removeEventListener('mousedown', addWallBegin);

  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground(bgContext);

  instructions.innerHTML = 'Select start position';
  animationCanvas.addEventListener('mousedown', addStart);
}

/**
 * Creates the background grid for our path finding.
 */
function setup() {
  document.getElementById('resetButton').onclick = reset;

  document.getElementById('dijkstraButton').onclick = reset;

  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground();

  animationCanvas.addEventListener('mousedown', addStart);
  window.addEventListener('resize', resize);
}

setup();
