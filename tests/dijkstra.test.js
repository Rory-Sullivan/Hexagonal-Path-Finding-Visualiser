/* globals describe, before, beforeEach, it, expect */

describe('Tests for the addToMinDist() function', () => {
  let noWallGrid;
  let d1;

  beforeEach('Set up minDist array before each test', () => {
    noWallGrid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    d1 = new Dijkstra(noWallGrid, [0, 0], [1, 1]);

    d1.minDist = [{ d: 0 }, { d: 1 }, { d: 3 }, { d: 4 }];
  });

  it('Check adding to an empty array', () => {
    d1.minDist = [];
    d1.addToMinDist({ d: 0 });
    expect(d1.minDist).to.deep.equal([{ d: 0 }]);
  });

  it('Check adding to middle', () => {
    d1.addToMinDist({ d: 2 });
    expect(d1.minDist).to.deep.equal([
      { d: 0 },
      { d: 1 },
      { d: 2 },
      { d: 3 },
      { d: 4 },
    ]);
  });

  it('Check adding duplicate value', () => {
    d1.addToMinDist({ d: 3 });
    expect(d1.minDist).to.deep.equal([
      { d: 0 },
      { d: 1 },
      { d: 3 },
      { d: 3 },
      { d: 4 },
    ]);
  });

  it('Check adding to end', () => {
    d1.addToMinDist({ d: 6 });
    expect(d1.minDist).to.deep.equal([
      { d: 0 },
      { d: 1 },
      { d: 3 },
      { d: 4 },
      { d: 6 },
    ]);
  });
});

describe('Tests for the Dijkstra algorithm', () => {
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
    const d1 = new Dijkstra(noWallGrid, [1, 0], [1, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(5);
  });

  it('Test on basic wall grid', () => {
    const d1 = new Dijkstra(basicWallGrid, [3, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(9);
  });

  it('Test on complex wall grid', () => {
    const d1 = new Dijkstra(complexWallGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(12);
  });

  it('Test no path', () => {
    const d1 = new Dijkstra(noPathGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.noPath).to.equal(true);
    expect(d1.path).to.have.lengthOf(0);
  });
});
