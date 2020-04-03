export default function horizontalMaze() {
  let startJ = 0;
  let endJ = n - 1;

  for (let i = 1; i < m; i += 2) {
    for (let j = startJ; j < endJ; j += 1) {
      if (
        !(i === start[0] && j === start[1]) &&
        !(i === end[0] && j === end[1])
      ) {
        grid[i][j] = 1;
        hexes[i][j].fill = 'black';
      }
    }
    startJ = (startJ + 1) % 2;
    endJ = n - 1 + startJ;
  }
  animate();
}
