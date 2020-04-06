/* globals describe, before, beforeEach, it, expect */

describe('Tests for the Node() class', () => {
  let graph1;
  let graph2;
  let graph3;

  before('Set up three graphs of nodes', () => {
    graph1 = [];
    graph2 = [];
    graph3 = [];

    // Single node
    graph1.push([new Node(0, 0, graph1)]);

    // 3 X 3 graph
    for (let i = 0; i < 3; i += 1) {
      const row = [];
      for (let j = 0; j < 3; j += 1) {
        row.push(new Node(i, j, graph2));
      }
      graph2.push(row);
    }

    // 3 X 4 graph
    for (let i = 0; i < 3; i += 1) {
      const row = [];
      for (let j = 0; j < 4; j += 1) {
        row.push(new Node(i, j, graph3));
      }
      graph3.push(row);
    }
  });

  describe('Test we can access all nodes', () => {
    it('Test single node', () => {
      const node = graph1[0][0];
      expect(node.row).to.equal(0);
      expect(node.col).to.equal(0);
    });

    it('Test 3 X 3 graph', () => {
      for (let i = 0; i < graph2.length; i += 1) {
        const row = graph2[i];
        for (let j = 0; j < row.length; j += 1) {
          const node = row[j];
          expect(node.row).to.equal(i);
          expect(node.col).to.equal(j);
        }
      }
    });

    it('Test 3 X 4 graph', () => {
      for (let i = 0; i < graph3.length; i += 1) {
        const row = graph3[i];
        for (let j = 0; j < row.length; j += 1) {
          const node = row[j];
          expect(node.row).to.equal(i);
          expect(node.col).to.equal(j);
        }
      }
    });
  });

  describe('Tests for the getNeighbours() method and neighbours property', () => {
    describe('Test method executes on all nodes', () => {
      it('Test single node', () => {
        const node = graph1[0][0];
        node.getNeighbours();
      });

      it('Test 3 X 3 graph', () => {
        for (let i = 0; i < graph2.length; i += 1) {
          const row = graph2[i];
          for (let j = 0; j < row.length; j += 1) {
            const node = row[j];
            node.getNeighbours();
          }
        }
      });

      it('Test 3 X 4 graph', () => {
        for (let i = 0; i < graph3.length; i += 1) {
          const row = graph3[i];
          for (let j = 0; j < row.length; j += 1) {
            const node = row[j];
            node.getNeighbours();
          }
        }
      });
    });

    describe('Test return values are correct for all cases', () => {
      it('Test an inner node from column 1', () => {
        const node = graph2[1][1];
        node.getNeighbours();

        const n1 = graph2[0][1];
        const n2 = graph2[2][1];
        const n3 = graph2[1][0];
        const n4 = graph2[2][0];
        const n5 = graph2[1][2];
        const n6 = graph2[2][2];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.include(n5);
        expect(node.neighbours).to.include(n6);
        expect(node.neighbours).to.have.lengthOf(6);
      });

      it('Test an inner node from column 2', () => {
        const node = graph3[1][2];
        node.getNeighbours();

        const n1 = graph3[0][2];
        const n2 = graph3[2][2];
        const n3 = graph3[0][1];
        const n4 = graph3[1][1];
        const n5 = graph3[0][3];
        const n6 = graph3[1][3];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.include(n5);
        expect(node.neighbours).to.include(n6);
        expect(node.neighbours).to.have.lengthOf(6);
      });

      it('Test a first row, column 1 node from 3 X 3 graph', () => {
        const node = graph2[0][1];
        node.getNeighbours();

        const n1 = graph2[1][1];
        const n2 = graph2[0][0];
        const n3 = graph2[1][0];
        const n4 = graph2[0][2];
        const n5 = graph2[1][2];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.include(n5);
        expect(node.neighbours).to.have.lengthOf(5);
      });

      it('Test a first row, column 2 node from 3 X 4 graph', () => {
        const node = graph3[0][2];
        node.getNeighbours();

        const n1 = graph3[0][1];
        const n2 = graph3[1][2];
        const n3 = graph3[0][3];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.have.lengthOf(3);
      });

      it('Test a last row, column 1 node from 3 X 3 graph', () => {
        const node = graph2[2][1];
        node.getNeighbours();

        const n1 = graph2[2][0];
        const n2 = graph2[1][1];
        const n3 = graph2[2][2];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.have.lengthOf(3);
      });

      it('Test a last row, column 2 node from 3 X 4 graph', () => {
        const node = graph3[2][2];
        node.getNeighbours();

        const n1 = graph3[1][2];
        const n2 = graph3[2][1];
        const n3 = graph3[1][1];
        const n4 = graph3[1][3];
        const n5 = graph3[2][3];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.include(n5);
        expect(node.neighbours).to.have.lengthOf(5);
      });

      it('Test a left column node from 3 X 3 graph', () => {
        const node = graph2[1][0];
        node.getNeighbours();

        const n1 = graph2[0][0];
        const n2 = graph2[2][0];
        const n3 = graph2[0][1];
        const n4 = graph2[1][1];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.have.lengthOf(4);
      });

      it('Test a right column node from 3 X 3 graph', () => {
        const node = graph2[1][2];
        node.getNeighbours();

        const n1 = graph2[0][2];
        const n2 = graph2[2][2];
        const n3 = graph2[0][1];
        const n4 = graph2[1][1];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.have.lengthOf(4);
      });

      it('Test a right column node from 3 X 4 graph', () => {
        const node = graph3[1][3];
        node.getNeighbours();

        const n1 = graph3[0][3];
        const n2 = graph3[2][3];
        const n3 = graph3[1][2];
        const n4 = graph3[2][2];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.include(n4);
        expect(node.neighbours).to.have.lengthOf(4);
      });

      it('Test the top-left node of 3 X 3 graph', () => {
        const node = graph2[0][0];
        node.getNeighbours();

        const n1 = graph2[1][0];
        const n2 = graph2[0][1];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.have.lengthOf(2);
      });

      it('Test the bottom-right node of 3 X 3 graph', () => {
        const node = graph2[2][2];
        node.getNeighbours();

        const n1 = graph2[2][1];
        const n2 = graph2[1][1];
        const n3 = graph2[1][2];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.include(n3);
        expect(node.neighbours).to.have.lengthOf(3);
      });

      it('Test the bottom-right node of 3 X 4 graph', () => {
        const node = graph3[2][3];
        node.getNeighbours();

        const n1 = graph3[2][2];
        const n2 = graph3[1][3];
        expect(node.neighbours).to.include(n1);
        expect(node.neighbours).to.include(n2);
        expect(node.neighbours).to.have.lengthOf(2);
      });

      describe('Tests for wall functionality', () => {
        it('Test walls are not included as neighbours', () => {
          const node = graph2[1][1];
          graph2[2][2].isWall = true;
          node.getNeighbours();

          const n1 = graph2[0][1];
          const n2 = graph2[2][1];
          const n3 = graph2[1][0];
          const n4 = graph2[2][0];
          const n5 = graph2[1][2];
          expect(node.neighbours).to.include(n1);
          expect(node.neighbours).to.include(n2);
          expect(node.neighbours).to.include(n3);
          expect(node.neighbours).to.include(n4);
          expect(node.neighbours).to.include(n5);
          expect(node.neighbours).to.have.lengthOf(5);

          graph2[2][2].isWall = false;
        });

        it('Test walls have no neighbours', () => {
          const node = graph2[1][1];
          node.isWall = true;
          node.getNeighbours();

          expect(node.neighbours).to.have.lengthOf(0);

          graph2[2][2].isWall = false;
        });

        it('Test node with walls on three sides', () => {
          const node = graph2[1][0];
          graph2[0][1].isWall = true;
          graph2[1][1].isWall = true;
          graph2[2][0].isWall = true;
          node.getNeighbours();

          expect(node.neighbours).to.include(graph2[0][0]);
          expect(node.neighbours).to.have.lengthOf(1);

          graph2[0][1].isWall = false;
          graph2[1][1].isWall = false;
          graph2[2][0].isWall = false;
        });
      });
    });
  });
});

describe('Tests for the Graph class', () => {
  let grid;
  before('Sets up a basic grid for testing', () => {
    grid = [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ];
  });

  it('new Graph() test', () => {
    const graph = new Graph(grid);
  });

  it('Test that it returns what we expect', () => {
    const graph = new Graph(grid);

    expect(graph).to.have.lengthOf(4);
    expect(graph[0]).to.have.lengthOf(5);
    expect(graph[0][0]).to.be.instanceOf(Node);
    expect(graph[3][4].neighbours).to.have.lengthOf(3);
  });
});

describe('Tests for distance function', () => {
  describe('Tests from [0, 0]', () => {
    const x = [0, 0];

    it('To [0, 1]', () => {
      const y = [0, 1];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(1);
    });
    it('To [1, 0]', () => {
      const y = [0, 1];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(1);
    });
    it('To [1, 2]', () => {
      const y = [1, 2];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(2);
    });

    it('To [2, 3]', () => {
      const y = [2, 3];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(4);
    });
  });
});
