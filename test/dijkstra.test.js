import 'chai/register-expect.js';

import Dijkstra from '../algorithms/Dijkstra.js';
import Grid from '../grid/Grid.js';

describe('Tests for the addToMinDist() function', function () {
  let noWallGrid;
  let d1;

  beforeEach('Set up minDist array before each test', function () {
    const hexSize = { width: 16 };
    hexSize.height = Math.floor(hexSize.width * (Math.sqrt(3) / 2));

    noWallGrid = new Grid(4, 5, hexSize);
    noWallGrid.start = [0, 0];
    noWallGrid[0][0].isStart = true;
    noWallGrid.end = [1, 1];
    noWallGrid[1][1].isEnd = true;

    d1 = new Dijkstra(noWallGrid, [0, 0], [1, 1]);

    d1.minDist = [{ dStart: 0 }, { dStart: 1 }, { dStart: 3 }, { dStart: 4 }];
  });

  it('Check adding to an empty array', function () {
    d1.minDist = [];
    d1.addToMinDist({ dStart: 0 });
    expect(d1.minDist).to.deep.equal([{ dStart: 0 }]);
  });

  it('Check adding to middle', function () {
    d1.addToMinDist({ dStart: 2 });
    expect(d1.minDist).to.deep.equal([
      { dStart: 0 },
      { dStart: 1 },
      { dStart: 2 },
      { dStart: 3 },
      { dStart: 4 },
    ]);
  });

  it('Check adding duplicate value', function () {
    d1.addToMinDist({ dStart: 3 });
    expect(d1.minDist).to.deep.equal([
      { dStart: 0 },
      { dStart: 1 },
      { dStart: 3 },
      { dStart: 3 },
      { dStart: 4 },
    ]);
  });

  it('Check adding to end', function () {
    d1.addToMinDist({ dStart: 6 });
    expect(d1.minDist).to.deep.equal([
      { dStart: 0 },
      { dStart: 1 },
      { dStart: 3 },
      { dStart: 4 },
      { dStart: 6 },
    ]);
  });
});

describe('Tests for the Dijkstra algorithm', function () {
  let noWallGrid;
  let basicWallGrid;
  let complexWallGrid;
  let noPathGrid;

  before('Setup grids for our tests', function () {
    const hexSize = { width: 16 };
    hexSize.height = Math.floor(hexSize.width * (Math.sqrt(3) / 2));

    noWallGrid = new Grid(4, 5, hexSize);
    noWallGrid.start = [1, 0];
    noWallGrid[1][0].isStart = true;
    noWallGrid.end = [1, 4];
    noWallGrid[1][4].isEnd = true;

    basicWallGrid = new Grid(4, 5, hexSize);
    basicWallGrid[1][2].isWall = true;
    basicWallGrid[2][2].isWall = true;
    basicWallGrid[3][2].isWall = true;
    basicWallGrid.start = [3, 0];
    basicWallGrid[3][0].isStart = true;
    basicWallGrid.end = [3, 4];
    basicWallGrid[3][4].isEnd = true;

    complexWallGrid = new Grid(4, 5, hexSize);
    complexWallGrid[0][1].isWall = true;
    complexWallGrid[1][1].isWall = true;
    complexWallGrid[2][1].isWall = true;
    complexWallGrid[1][3].isWall = true;
    complexWallGrid[2][3].isWall = true;
    complexWallGrid[3][3].isWall = true;
    complexWallGrid.start = [0, 0];
    complexWallGrid[0][0].isStart = true;
    complexWallGrid.end = [3, 4];
    complexWallGrid[3][4].isEnd = true;

    noPathGrid = new Grid(4, 5, hexSize);
    noPathGrid[0][2].isWall = true;
    noPathGrid[1][2].isWall = true;
    noPathGrid[2][2].isWall = true;
    noPathGrid[3][2].isWall = true;
    noPathGrid.start = [1, 0];
    noPathGrid[1][0].isStart = true;
    noPathGrid.end = [1, 4];
    noPathGrid[1][4].isEnd = true;
  });

  it('Test on no wall grid', function () {
    const d1 = new Dijkstra(noWallGrid, [1, 0], [1, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(5);
  });

  it('Test on basic wall grid', function () {
    const d1 = new Dijkstra(basicWallGrid, [3, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(9);
  });

  it('Test on complex wall grid', function () {
    const d1 = new Dijkstra(complexWallGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(12);
  });

  it('Test no path', function () {
    const d1 = new Dijkstra(noPathGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.noPath).to.equal(true);
    expect(d1.path).to.have.lengthOf(0);
  });
});
