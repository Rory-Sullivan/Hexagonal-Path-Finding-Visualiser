/* globals grid, animationContext */

import { updateDisplay } from '../userInterface/display.js';

export default function verticalMaze() {
  let startI = 0;
  let endI = grid.rows - 1;

  for (let j = 1; j < grid.cols; j += 2) {
    for (let i = startI; i < endI; i += 1) {
      const tile = grid[i][j];
      if (!tile.isStart && !tile.isEnd) {
        tile.isWall = true;
        tile.fill = 'black';
      }
    }
    startI = (startI + 1) % 2;
    endI = grid.rows - 1 + startI;
  }
  updateDisplay(animationContext);
}
