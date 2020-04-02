class aStar {
  constructor(grid, startNode, endNode) {
    this.graph = new Graph(grid);
    this.endNode = endNode;
    this.path = [];
    this.pathFound = false;
    this.noPath = false;
    this.minDist = []; // Ordered list of nodes with the node of minimum
    // distance at position zero.

    this.graph[startNode[0]][startNode[1]].isStart = true;
    this.graph[startNode[0]][startNode[1]].dStart = 0; // distance from start node
    this.graph[startNode[0]][startNode[1]].dEnd = hexDistanceBetween(
      startNode,
      endNode,
    ); // distance from end node
    this.graph[startNode[0]][startNode[1]].d = this.graph[startNode[0]][startNode[1]].dStart
            + this.graph[startNode[0]][startNode[1]].dEnd;
    this.addToMinDist(this.graph[startNode[0]][startNode[1]]);

    this.graph[endNode[0]][endNode[1]].isEnd = true;
  }

  /**
     * Increments a step of the algorithm.
     */
  step() {
    if (this.pathFound) {
      return;
    }

    if (this.minDist.length === 0) {
      // No path exists
      this.noPath = true;
      this.pathFound = true;
      return;
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

      return;
    }

    for (let i = 0; i < currentNode.neighbours.length; i++) {
      const neighbour = currentNode.neighbours[i];
      checkedNodes.push(neighbour);

      if (neighbour.dEnd == undefined) {
        neighbour.dStart = Infinity;
        neighbour.dEnd = hexDistanceBetween(
          [neighbour.row, neighbour.col],
          this.endNode,
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
    }

    return checkedNodes;
  }

  solve() {
    do {
      this.step();
    } while (!this.pathFound);
  }

  addToMinDist(node) {
    for (let i = 0; i < this.minDist.length; i++) {
      if (node.d < this.minDist[i].d) {
        this.minDist.splice(i, 0, node);
        return;
      }
    }
    this.minDist.push(node);
  }
}
