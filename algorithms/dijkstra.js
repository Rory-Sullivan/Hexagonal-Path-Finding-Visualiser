/**
 * An implementation of Dijksta's shortest path algorithm.  This implementation
 * finds the shortest path from a start node to an end node in a hexagonal grid
 * where each node is separated by a distance of one.
 */

/* global Graph */

/**
 * Implements our Dijkstra algorithm.  Inputs are our hexagonal grid matrix, an
 * array representing the start node position and an array representing the end
 * node position.
 */
export default class Dijkstra {
  constructor(grid, startNode, endNode) {
    this.graph = new Graph(grid);
    this.path = [];
    this.pathFound = false;
    this.noPath = false;
    this.minDist = []; // Ordered list of nodes with the node of minimum
    // distance from the start node at position zero.

    this.graph[startNode[0]][startNode[1]].isStart = true;
    this.graph[startNode[0]][startNode[1]].d = 0;
    this.addToMinDist(this.graph[startNode[0]][startNode[1]]);

    this.graph[endNode[0]][endNode[1]].isEnd = true;
  }

  /**
   * Increments a step of the algorithm.
   */
  step() {
    if (this.pathFound) {
      return true;
    }

    if (this.minDist.length === 0) {
      // No path exists
      this.noPath = true;
      this.pathFound = true;
      return true;
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

      return true;
    }

    const dPlus1 = currentNode.d + 1;

    for (let i = 0; i < currentNode.neighbours.length; i += 1) {
      const neighbour = currentNode.neighbours[i];
      checkedNodes.push(neighbour);

      if (neighbour.d > dPlus1) {
        neighbour.d = dPlus1;
        neighbour.pathTo = currentNode;

        if (this.minDist.includes(neighbour)) {
          this.minDist.sort((a, b) => a.d - b.d);
        } else {
          this.addToMinDist(neighbour);
        }
      }
    }

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
