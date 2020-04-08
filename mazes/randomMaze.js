import { updateDisplay } from '../userInterface/display.js';

export default function randomMaze() {
  const chance = 6; // probability that a tile is chosen to be a wall is
  // 1/chance

  grid.forEach((row) => {
    row.forEach((tile) => {
      if (!tile.isStart && !tile.isEnd) {
        const rand = Math.floor(Math.random() * chance);

        if (rand === 0) {
          tile.isWall = true;
          tile.fill = 'black';
        }
      }
    });
  });

  updateDisplay(animationContext);
}
