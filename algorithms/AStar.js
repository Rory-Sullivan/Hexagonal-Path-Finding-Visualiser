import Graph from './Graph.js';
import hexDistanceBetween from './hexDistanceBetween.js';

/**
 * Implements the A* algorithm to find the shortest path between two points on
 * a hexagonal grid.  Every point is assumed to have a distance of one between
 * it.
 */
export default class AStar {
  constructor(grid) {
    this.graph = new Graph(grid);
    this.path = [];
    this.pathFound = false;
    this.noPath = false;
    this.minDist = []; // Ordered list of nodes with the node of minimum
    // distance at position zero.

    this.graph[this.graph.start[0]][
      this.graph.start[1]
    ].dEnd = hexDistanceBetween(this.graph.start, this.graph.end); // distance from end node
    this.graph[this.graph.start[0]][this.graph.start[1]].d = this.graph[
      this.graph.start[0]
    ][this.graph.start[1]].dEnd;
    this.addToMinDist(this.graph[this.graph.start[0]][this.graph.start[1]]);
  }

  /**
   * Increments a step of the algorithm. Returns a list of the nodes considered
   * at that step if any, otherwise false.
   */
  step() {
    if (this.pathFound) {
      return false;
    }

    if (this.minDist.length === 0) {
      // No path exists
      this.noPath = true;
      this.pathFound = true;
      return false;
    }

    let currentNode = this.minDist.shift();
    const checkedNodes = [];

    if (currentNode.isEnd) {
      // We are done calculate path and return.
      this.pathFound = true;

      this.path = [currentNode];

      do {
        const previousNode = currentNode.pathTo;
        this.path.unshift(previousNode);
        currentNode = previousNode;
      } while (!currentNode.isStart);

      return false;
    }

    currentNode.neighbours.forEach((neighbour) => {
      checkedNodes.push(neighbour);

      if (neighbour.dEnd === undefined) {
        neighbour.d = Infinity;
        neighbour.dEnd = hexDistanceBetween(
          [neighbour.row, neighbour.col],
          this.graph.end
        );
      }

      if (neighbour.dStart > currentNode.dStart + 1) {
        neighbour.dStart = currentNode.dStart + 1;
        neighbour.pathTo = currentNode;
      }

      if (neighbour.d !== neighbour.dStart + neighbour.dEnd) {
        neighbour.d = neighbour.dStart + neighbour.dEnd;
        if (this.minDist.includes(neighbour)) {
          this.minDist.sort((a, b) => a.d - b.d);
        } else {
          this.addToMinDist(neighbour);
        }
      }
    });

    return checkedNodes;
  }

  solve() {
    do {
      this.step();
    } while (!this.pathFound);
  }

  addToMinDist(node) {
    for (let i = 0; i < this.minDist.length; i += 1) {
      if (node.d < this.minDist[i].d) {
        this.minDist.splice(i, 0, node);
        return;
      }
    }
    this.minDist.push(node);
  }
}
