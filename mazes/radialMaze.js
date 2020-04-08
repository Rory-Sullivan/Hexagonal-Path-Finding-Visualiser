import { updateDisplay } from '../userInterface/display.js';
import hexDistanceBetween from '../algorithms/hexDistanceBetween.js';

/**
 * Draws a maze of concentric rings from the centre of the grid.  Note that a
 * path through the maze is not included.
 */
export default function radialMaze() {
  const centreRow = Math.floor(grid.rows / 2);
  const centreCol = Math.floor(grid.cols / 2);

  grid.forEach((row) => {
    row.forEach((tile) => {
      const dis = hexDistanceBetween(
        [centreRow, centreCol],
        [tile.row, tile.col]
      );
      if (dis % 2 === 1) {
        if (!tile.isStart && !tile.isEnd) {
          tile.isWall = true;
          tile.fill = 'black';
        }
      }
    });
  });
  updateDisplay(animationContext);
}
