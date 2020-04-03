import hexDistanceBetween from '../algorithms/hexDistanceBetween';

export default function radialMaze() {
  const centreRow = Math.floor(m / 2);
  const centreCol = Math.floor(n / 2);

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const dis = hexDistanceBetween([centreRow, centreCol], [i, j]);
      if (dis % 2 === 1) {
        if (
          !(i === start[0] && j === start[1]) &&
          !(i === end[0] && j === end[1])
        ) {
          grid[i][j] = 1;
          hexes[i][j].fill = 'black';
        }
      }
    }
  }
  animate();
}
