export default function randomMaze() {
  const chance = 6; // probability that a tile is chosen to be a wall is
  // 1/chance

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (
        !(i === start[0] && j === start[1]) &&
        !(i === end[0] && j === end[1])
      ) {
        const rand = Math.floor(Math.random() * chance);

        if (rand === 0) {
          grid[i][j] = 1;
          hexes[i][j].fill = 'black';
        }
      }
    }
  }
  animate();
}
