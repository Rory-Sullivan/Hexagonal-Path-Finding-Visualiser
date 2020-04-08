import GraphNode from './GraphNode.js';

/**
 * Makes a graph of nodes from our grid matrix.
 */
export default class Graph extends Array {
  constructor(grid) {
    super();

    this.start = grid.start;
    this.end = grid.end;

    for (let i = 0; i < grid.length; i += 1) {
      const gridRow = grid[i];
      const graphRow = [];

      for (let j = 0; j < gridRow.length; j += 1) {
        const tile = gridRow[j];
        const node = new GraphNode(i, j, this);

        if (tile.isWall) {
          node.isWall = true;
        } else if (tile.isStart) {
          node.isStart = true;
          node.dStart = 0;
        } else if (tile.isEnd) {
          node.isEnd = true;
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
