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
class Graph extends Array {
    constructor(grid) {
        super();
        for (let i = 0; i < grid.length; i++) {
            let row = grid[i];
            let graphRow = [];
            for (let j = 0; j < row.length; j++) {
                const a = row[j];
                let node = new Node(i, j, this);

                if (a === 1) {
                    node.isWall = true;
                }

                graphRow.push(node);
            }
            this.push(graphRow);
        }

        // Assign neighbours to all nodes
        for (let i = 0; i < this.length; i++) {
            let row = this[i];
            for (let j = 0; j < row.length; j++) {
                let node = row[j];
                node.getNeighbours();
            }
        }
    }
}

/**
 * Calculates the distance between two spaces on our hexagonal grid.
 */
function hexDistanceBetween(x, y) {
    let dis, dis1, dis2;
    let penalty;

    dis1 = Math.abs(x[1] - y[1]);

    if (
        (x[1] % 2 === 0 && y[1] % 2 === 1 && x[0] < y[0]) ||
        (x[1] % 2 === 1 && y[1] % 2 === 0 && x[0] > y[0])
    ) {
        penalty = 1;
    } else {
        penalty = 0;
    }
    dis2 = Math.abs(x[0] - y[0]) + Math.floor(dis1 / 2) + penalty;

    dis = Math.max(dis1, dis2);

    return dis;
}
