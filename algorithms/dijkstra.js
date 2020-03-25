/**
 * An implementation of Dijksta's shortest path algorithm.  This implementation
 * finds the shortest path from a start node to an end node in a hexagonal grid
 * where each node is separated by a distance of one.
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

        // top and bottom
        if (this.row === 0) {
            neighbours.push(this.graph[row + 1][col]);
        } else if (this.row === this.graph.length - 1) {
            neighbours.push(this.graph[row - 1][col]);
        } else {
            neighbours.push(this.graph[row - 1][col]);
            neighbours.push(this.graph[row + 1][col]);
        }

        // left
        if (this.col !== 0) {
            if (this.col % 2 === 0) {
                neighbours.push(this.graph[row][col - 1]);
                if (this.row !== 0) {
                    neighbours.push(this.graph[row - 1][col - 1]);
                }
            } else {
                neighbours.push(this.graph[row][col - 1]);
                if (this.row !== this.graph[row].length - 1) {
                    neighbours.push(this.graph[row + 1][col - 1]);
                }
            }
        }

        // right
        if (this.col !== this.graph[row].length - 1) {
            if (this.col % 2 === 0) {
                neighbours.push(this.graph[row][col + 1]);
                if (this.row !== 0) {
                    neighbours.push(this.graph[row - 1][col + 1]);
                }
            } else {
                neighbours.push(this.graph[row][col + 1]);
                if (this.row !== this.graph[row].length - 1) {
                    neighbours.push(this.graph[row + 1][col + 1]);
                }
            }
        }

        this.neighbours = neighbours;
    }
}

function dijkstra(grid, startNode, endNode) {}
