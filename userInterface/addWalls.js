/* global grid, animationCanvas, animationContext, animationId */

import getCursorPosition from './getCursorPosition.js';
import { updateDisplay } from './display.js';

function addWall(event) {
  const [row, col] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  if (
    (row === grid.start[0] && col === grid.start[1]) ||
    (row === grid.end[0] && col === grid.end[1])
  ) {
    return;
  }
  if (row > 0 || row < numRows - 1 || col > 0 || col < numCols - 1) {
    grid[row][col].isWall = true;
  }
}

function removeWall(event) {
  const [row, col] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  if (
    (row === grid.start[0] && col === grid.start[1]) ||
    (row === grid.end[0] && col === grid.end[1])
  ) {
    return;
  }
  if (row > 0 || row < numRows - 1 || col > 0 || col < numCols - 1) {
    grid[row][col].isWall = false;
  }
}

function addWallEnd() {
  clearInterval(animationId);
  updateDisplay(animationContext); // one more time just in case
  animationCanvas.removeEventListener('mousemove', addWall);
  animationCanvas.removeEventListener('mousemove', removeWall);
  window.removeEventListener('mouseup', addWallEnd);
}

export default function addWallBegin(event) {
  const [row, col] = getCursorPosition(event);
  const numRows = grid.rows;
  const numCols = grid.cols;

  if (row < 0 || row > numRows - 1 || col < 0 || col > numCols - 1) {
    return;
  }

  if (!grid[row][col].isWall) {
    animationCanvas.addEventListener('mousemove', addWall);
  } else {
    animationCanvas.addEventListener('mousemove', removeWall);
  }

  window.animationId = setInterval(updateDisplay, 33, animationContext);
  window.addEventListener('mouseup', addWallEnd);
}
