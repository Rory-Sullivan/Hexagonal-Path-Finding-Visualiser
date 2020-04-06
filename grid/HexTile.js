/**
 * Object for storing information about our hexagons.
 */
export default class HexTile {
  constructor(
    gridPosition,
    hexSize,
    isWall = false,
    isStart = false,
    isEnd = false
  ) {
    [this.row, this.col] = gridPosition;

    this.width = hexSize.width;
    this.height = hexSize.height;

    this.isWall = isWall;
    this.isStart = isStart;
    this.isEnd = isEnd;

    if (this.col % 2 === 0) {
      this.xPos = (this.col / 2) * (this.width * 3);
      this.yPos = this.height + this.row * (2 * this.height);
    } else {
      this.xPos =
        this.width * (3 / 2) + ((this.col - 1) / 2) * (this.width * 3);
      this.yPos = 2 * this.height + this.row * (2 * this.height);
    }
  }

  get fill() {
    if (this.isStart) {
      return 'green';
    }
    if (this.isEnd) {
      return 'red';
    }
    if (this.isWall) {
      return 'black';
    }
    return 'white';
  }

  reset() {
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
  }
}
