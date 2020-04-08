import 'chai/register-expect.js';

import AStar from '../algorithms/AStar.js';
import Grid from '../grid/Grid.js';

describe('Tests for the A* algorithm', () => {
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

  it('Test on no wall grid', () => {
    const d1 = new AStar(noWallGrid, [1, 0], [1, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(5);
  });

  it('Test on basic wall grid', () => {
    const d1 = new AStar(basicWallGrid, [3, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(9);
  });

  it('Test on complex wall grid', () => {
    const d1 = new AStar(complexWallGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.path).to.have.lengthOf(12);
  });

  it('Test no path', () => {
    const d1 = new AStar(noPathGrid, [0, 0], [3, 4]);
    d1.solve();
    expect(d1.pathFound).to.equal(true);
    expect(d1.noPath).to.equal(true);
    expect(d1.path).to.have.lengthOf(0);
  });
});
