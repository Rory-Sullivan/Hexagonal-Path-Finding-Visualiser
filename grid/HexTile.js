/**
 * Object for storing information about our hexagons.
 */
export default class HexTile {
  constructor(gridPosition, hexSize) {
    [this.row, this.col] = gridPosition;

    this.width = hexSize.width;
    this.height = hexSize.height;

    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.fill = 'white';

    if (this.col % 2 === 0) {
      this.xPos = (this.col / 2) * (this.width * 3);
      this.yPos = this.height + this.row * (2 * this.height);
    } else {
      this.xPos =
        this.width * (3 / 2) + ((this.col - 1) / 2) * (this.width * 3);
      this.yPos = 2 * this.height + this.row * (2 * this.height);
    }
  }

  reset() {
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.fill = 'white';
  }
}
