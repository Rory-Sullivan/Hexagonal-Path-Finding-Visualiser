/* globals describe, before, beforeEach, it, expect */

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
