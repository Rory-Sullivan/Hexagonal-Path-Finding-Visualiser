/* globals describe, before, it, expect */

describe('Tests for the A* algorithm', () => {
  let noWallGrid;
  let basicWallGrid;
  let complexWallGrid;
  let noPathGrid;

  before('Setup grids for our tests', () => {
    noWallGrid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    basicWallGrid = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ];

    complexWallGrid = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ];

    noPathGrid = [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ];
  });

  it('Test on no wall grid', () => {
    const d1 = new aStar(noWallGrid, [1, 0], [1, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(5);
  });

  it('Test on basic wall grid', () => {
    const d1 = new aStar(basicWallGrid, [3, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(9);
  });

  it('Test on complex wall grid', () => {
    const d1 = new aStar(complexWallGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(12);
  });

  it('Test no path', () => {
    const d1 = new aStar(noPathGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.noPath).to.equal(true);
    expect(d1.path).to.have.lengthOf(0);
  });
});
