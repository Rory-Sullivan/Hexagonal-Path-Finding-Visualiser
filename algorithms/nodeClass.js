/**
 * A class for creating nodes in a graph.
 */
class Node {
  constructor(row, col, parentGraph) {
    this.graph = parentGraph; // The graph containing this node
    this.row = row;
    this.col = col;
    this.d = Infinity; // current best known distance for this node.
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
  }

  /**
   * Enables access to the neighbours property of a node.  This property is an
   * array of all viable nodes that can be moved to from the current node.
   */
  getNeighbours() {
    let neighbours = [];

    if (!this.isWall) {
      // for readability
      const { row } = this;
      const { col } = this;

      // top and bottom
      if (row !== this.graph.length - 1) {
        neighbours.push(this.graph[row + 1][col]);
      }
      if (row !== 0) {
        neighbours.push(this.graph[row - 1][col]);
      }

      // left
      if (col !== 0) {
        neighbours.push(this.graph[row][col - 1]);
        if (col % 2 === 0 && row !== 0) {
          neighbours.push(this.graph[row - 1][col - 1]);
        } else if (col % 2 !== 0 && row !== this.graph.length - 1) {
          neighbours.push(this.graph[row + 1][col - 1]);
        }
      }

      // right
      if (col !== this.graph[row].length - 1) {
        neighbours.push(this.graph[row][col + 1]);
        if (col % 2 === 0 && row !== 0) {
          neighbours.push(this.graph[row - 1][col + 1]);
        } else if (col % 2 !== 0 && row !== this.graph.length - 1) {
          neighbours.push(this.graph[row + 1][col + 1]);
        }
      }

      // remove any neighbours that are actually walls
      const notWallNeighbours = [];
      for (let i = 0; i < neighbours.length; i += 1) {
        const node = neighbours[i];
        if (!node.isWall) {
          notWallNeighbours.push(node);
        }
      }
      neighbours = notWallNeighbours;
    }

    this.neighbours = neighbours;
  }
}
