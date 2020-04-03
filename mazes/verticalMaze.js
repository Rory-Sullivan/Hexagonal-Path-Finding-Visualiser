export default function verticalMaze() {
  let startI = 0;
  let endI = m - 1;

  for (let j = 1; j < n; j += 2) {
    for (let i = startI; i < endI; i += 1) {
      if (
        !(i === start[0] && j === start[1]) &&
        !(i === end[0] && j === end[1])
      ) {
        grid[i][j] = 1;
        hexes[i][j].fill = 'black';
      }
    }
    startI = (startI + 1) % 2;
    endI = m - 1 + startI;
  }
  animate();
}
