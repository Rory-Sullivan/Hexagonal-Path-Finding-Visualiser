import { updateDisplay } from '../userInterface/display.js';

export default function horizontalMaze() {
  let startJ = 0;
  let endJ = grid.cols - 1;

  for (let i = 1; i < grid.rows; i += 2) {
    for (let j = startJ; j < endJ; j += 1) {
      const tile = grid[i][j];
      if (!tile.isStart && !tile.isEnd) {
        tile.isWall = true;
        tile.fill = 'black';
      }
    }
    startJ = (startJ + 1) % 2;
    endJ = grid.cols - 1 + startJ;
  }
  updateDisplay(animationContext);
}
