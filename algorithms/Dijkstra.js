import Graph from './Graph.js';

/**
 * Implements the Dijkstra algorithm to find the shortest path between two
 * points on a hexagonal grid.  Every point is assumed to have a distance of one
 * between it.
 */
export default class Dijkstra {
  constructor(grid) {
    this.graph = new Graph(grid);
    this.path = [];
    this.pathFound = false;
    this.noPath = false;
    this.minDist = []; // Ordered list of nodes with the node of minimum
    // distance from the start node at position zero.

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

    const dPlus1 = currentNode.dStart + 1;

    currentNode.neighbours.forEach((neighbour) => {
      checkedNodes.push(neighbour);

      if (neighbour.dStart > dPlus1) {
        neighbour.dStart = dPlus1;
        neighbour.pathTo = currentNode;

        if (this.minDist.includes(neighbour)) {
          this.minDist.sort((a, b) => a.dStart - b.dStart);
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
      if (node.dStart < this.minDist[i].dStart) {
        this.minDist.splice(i, 0, node);
        return;
      }
    }
    this.minDist.push(node);
  }
}
