/* global grid, animationCanvas, animationContext, instructions */

import getCursorPosition from './getCursorPosition.js';
import { updateDisplay } from './display.js';
import addWallBegin from './addWalls.js';

function addEnd(event) {
  const [x, y] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  if (x < 0 || x > numRows - 1 || y < 0 || y > numCols - 1) {
    return;
  }
  if (x === grid.start[0] && y === grid.start[1]) {
    return;
  }

  grid.end = [x, y];
  grid[x][y].isEnd = true;

  grid[x][y].isWall = false; // just in case they click on a wall

  updateDisplay(animationContext);

  animationCanvas.removeEventListener('mousedown', addEnd);
  animationCanvas.addEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Add walls';
}

export default function addStart(event) {
  const [x, y] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  if (x < 0 || x > numRows - 1 || y < 0 || y > numCols - 1) {
    return;
  }

  grid.start = [x, y];
  grid[x][y].isStart = true;

  grid[x][y].isWall = false; // just in case they click on a wall

  updateDisplay(animationContext);

  animationCanvas.removeEventListener('mousedown', addStart);
  animationCanvas.addEventListener('mousedown', addEnd);
  instructions.innerHTML = 'Select end position';
}
