import GraphNode from './GraphNode';

/**
 * Makes a graph of nodes from our grid matrix.  Grid matrix values of 0
 * represent a normal node, values of 1 represent a wall.
 */
export default class Graph extends Array {
  constructor(grid) {
    super();
    for (let i = 0; i < grid.length; i += 1) {
      const row = grid[i];
      const graphRow = [];
      for (let j = 0; j < row.length; j += 1) {
        const a = row[j];
        const node = new GraphNode(i, j, this);

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
