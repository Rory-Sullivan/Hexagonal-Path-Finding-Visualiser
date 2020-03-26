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
function dijkstra(grid, startNode, endNode) {
    let graph = makeGraph(grid);

    if (startNode === endNode) {
        throw 'Start node cannot be end node.';
    }

    graph[startNode[0]][startNode[1]].isStart = true;
    graph[startNode[0]][startNode[1]].d = 0;

    graph[endNode[0]][endNode[1]].isEnd = true;
}
