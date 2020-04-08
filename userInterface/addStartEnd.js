import getCursorPosition from './getCursorPosition.js';
import { updateDisplay } from './display.js';
import addWallBegin from './addWalls.js';

function addEnd(event) {
  const [x, y] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  // Check if the click was on the canvas but outside the grid.
  if (x < 0 || x > numRows - 1 || y < 0 || y > numCols - 1) {
    return;
  }
  // Check if the start node was clicked.
  if (x === grid.start[0] && y === grid.start[1]) {
    return;
  }

  grid.end = [x, y];
  grid[x][y].isEnd = true;
  grid[x][y].fill = 'red';

  updateDisplay(animationContext);

  animationCanvas.removeEventListener('mousedown', addEnd);
  animationCanvas.addEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Add walls';
}

export default function addStart(event) {
  const [x, y] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  // Check if the click was on the canvas but outside the grid.
  if (x < 0 || x > numRows - 1 || y < 0 || y > numCols - 1) {
    return;
  }

  grid.start = [x, y];
  grid[x][y].isStart = true;
  grid[x][y].fill = 'green';

  updateDisplay(animationContext);

  animationCanvas.removeEventListener('mousedown', addStart);
  animationCanvas.addEventListener('mousedown', addEnd);
  instructions.innerHTML = 'Select end position';
}
