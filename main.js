import Grid from './grid/Grid.js';
import addStart from './userInterface/addStartEnd.js';
import { updateDisplay, drawBackground } from './userInterface/display.js';
import addWallBegin from './userInterface/addWalls.js';
import animateAlgorithmBegin from './userInterface/animateAlgorithm.js';

import randomMaze from './mazes/randomMaze.js';
import verticalMaze from './mazes/verticalMaze.js';
import horizontalMaze from './mazes/horizontalMaze.js';
import radialMaze from './mazes/radialMaze.js';

// Hexagons. Controls the size in pixels of the hexagons.
window.hexSize = { width: 16 }; // Should be divisible by 2
hexSize.height = Math.floor(hexSize.width * (Math.sqrt(3) / 2));

// Grid matrix. Stores information about the hex grid and is fed into the
// algorithms.
window.grid = [];

// Animation
window.animationDelay = 33; // milliseconds
window.timeoutId = null;

// Document elements
window.bgCanvas = document.getElementById('background');
window.bgContext = bgCanvas.getContext('2d');
window.animationCanvas = document.getElementById('animation');
window.animationContext = animationCanvas.getContext('2d');
window.instructions = document.getElementById('instructions');

function updateCanvasSize() {
  const w = document.getElementById('canvasContainer').offsetWidth;
  const h = document.getElementById('canvasContainer').offsetHeight;
  bgCanvas.width = w;
  bgCanvas.height = h;
  animationCanvas.width = w;
  animationCanvas.height = h;

  return [w, h];
}

function updateGridSize(canvasWidth, canvasHeight) {
  const rows = Math.floor(
    (canvasHeight - hexSize.height) / (hexSize.height * 2)
  );
  const cols = Math.floor(
    (canvasWidth - hexSize.width / 2) / (hexSize.width * 1.5)
  );

  // eslint-disable-next-line no-global-assign
  grid = new Grid(rows, cols, hexSize);
}

function reset() {
  // Enable buttons. May be disabled if an algorithm is running.
  const algButtonsContainer = document.getElementById('algorithmButtons');
  for (let i = 0; i < algButtonsContainer.children.length; i += 1) {
    const button = algButtonsContainer.children[i];
    button.disabled = false;
  }
  const mazeButtonsContainer = document.getElementById('mazeButtons');
  for (let i = 0; i < mazeButtonsContainer.children.length; i += 1) {
    const button = mazeButtonsContainer.children[i];
    button.disabled = false;
  }

  // Stop animation of an algorithm. One may be running.
  clearTimeout(timeoutId);

  animationCanvas.removeEventListener('mousedown', addWallBegin);

  grid.start = undefined;
  grid.end = undefined;

  grid.forEach((row) => {
    row.forEach((tile) => {
      tile.reset();
    });
  });

  updateDisplay(animationContext);

  animationCanvas.addEventListener('mousedown', addStart);
  instructions.innerHTML = 'Select start position';
}

function resize() {
  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground(bgContext);

  reset();
}

function setup() {
  document.getElementById('resetButton').onclick = reset;

  document.getElementById('dijkstraButton').onclick = () => {
    animateAlgorithmBegin('dijkstra');
  };
  document.getElementById('aStarButton').onclick = () => {
    animateAlgorithmBegin('aStar');
  };
  document.getElementById('biasedAStarButton').onclick = () => {
    animateAlgorithmBegin('biasedAStar');
  };

  document.getElementById('randomMazeButton').onclick = randomMaze;
  document.getElementById('verticalMazeButton').onclick = verticalMaze;
  document.getElementById('horizontalMazeButton').onclick = horizontalMaze;
  document.getElementById('radialMazeButton').onclick = radialMaze;

  document.getElementById('tutorialButton').onclick = () => {
    document.getElementById('tutorial').style.display = 'block';
  };
  document.getElementById('closeTutorial').onclick = () => {
    document.getElementById('tutorial').style.display = 'none';
  };
  window.onclick = (event) => {
    const tutorial = document.getElementById('tutorial');
    if (event.target === tutorial) {
      tutorial.style.display = 'none';
    }
  };

  const [w, h] = updateCanvasSize();
  updateGridSize(w, h);
  drawBackground();

  animationCanvas.addEventListener('mousedown', addStart);
  window.addEventListener('resize', resize);
}

setup();
