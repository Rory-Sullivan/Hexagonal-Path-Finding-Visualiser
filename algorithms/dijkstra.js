/**
 * An implementation of Dijksta's shortest path algorithm.  This implementation
 * finds the shortest path from a start node to an end node in a hexagonal grid
 * where each node is separated by a distance of one.
 */

/**
 * A class for creating nodes in a graph.
 */
class Node {
    constructor(row, col, parentGraph) {
        this.graph = parentGraph; // The graph containing this node
        this.row = row;
        this.col = col;
        this.d = Infinity; // Distance from start node.
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
            let row = this.row;
            let col = this.col;

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
            let notWallNeighbours = [];
            for (let i = 0; i < neighbours.length; i++) {
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

/**
 * Makes a graph of nodes from our grid matrix.  Grid matrix values of 0
 * represent a normal node, values of 1 represent a wall.
 */
function makeGraph(grid) {
    let graph = [];

    for (let i = 0; i < grid.length; i++) {
        let row = grid[i];
        let graphRow = [];
        for (let j = 0; j < row.length; j++) {
            const a = row[j];
            let node = new Node(i, j, graph);

            if (a === 1) {
                node.isWall = true;
            }

            graphRow.push(node);
        }
        graph.push(graphRow);
    }

    // Assign neighbours to all nodes
    for (let i = 0; i < graph.length; i++) {
        let row = graph[i];
        for (let j = 0; j < row.length; j++) {
            let node = row[j];
            node.getNeighbours();
        }
    }
    return graph;
}

/**
 * Implements our Dijkstra algorithm.  Inputs are our hexagonal grid matrix, an
 * array representing the start node position and an array representing the end
 * node position.
 */
class Dijkstra {
    constructor(grid, startNode, endNode) {
        this.graph = makeGraph(grid);
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
            return;
        }

        if (this.minDist.length === 0) {
            // No path exists
            this.noPath = true;
            this.pathFound = true;
            return;
        }

        let currentNode = this.minDist.shift();

        if (currentNode.isEnd) {
            // We are done calculate path and return.
            this.pathFound = true;

            this.path = [currentNode];

            do {
                let previousNode = currentNode.pathTo;
                this.path.unshift(previousNode);
                currentNode = previousNode;
            } while (!currentNode.isStart);

            return;
        }

        let dPlus1 = currentNode.d + 1;

        for (let i = 0; i < currentNode.neighbours.length; i++) {
            let neighbour = currentNode.neighbours[i];

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
