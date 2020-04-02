/**
 * Makes a graph of nodes from our grid matrix.  Grid matrix values of 0
 * represent a normal node, values of 1 represent a wall.
 */
class Graph extends Array {
  constructor(grid) {
    super();
    for (let i = 0; i < grid.length; i += 1) {
      const row = grid[i];
      const graphRow = [];
      for (let j = 0; j < row.length; j += 1) {
        const a = row[j];
        const node = new Node(i, j, this);

        if (a === 1) {
          node.isWall = true;
        }

        graphRow.push(node);
      }
      this.push(graphRow);
    }

    // Assign neighbours to all nodes
    for (let i = 0; i < this.length; i += 1) {
      const row = this[i];
      for (let j = 0; j < row.length; j += 1) {
        const node = row[j];
        node.getNeighbours();
      }
    }
  }
}

/**
 * Calculates the distance between two spaces on our hexagonal grid.
 */
function hexDistanceBetween(x, y) {
  const dis1 = Math.abs(x[1] - y[1]);

  let penalty;

  if (
    (x[1] % 2 === 0 && y[1] % 2 === 1 && x[0] < y[0]) ||
    (x[1] % 2 === 1 && y[1] % 2 === 0 && x[0] > y[0])
  ) {
    penalty = 1;
  } else {
    penalty = 0;
  }
  const dis2 = Math.abs(x[0] - y[0]) + Math.floor(dis1 / 2) + penalty;

  const dis = Math.max(dis1, dis2);

  return dis;
}
