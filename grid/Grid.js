import HexTile from './HexTile.js';

export default class Grid extends Array {
  constructor(rows, cols, hexSize) {
    super();

    this.rows = rows;
    this.cols = cols;
    this.hexSize = hexSize;

    for (let i = 0; i < this.rows; i += 1) {
      const gridRow = [];
      for (let j = 0; j < this.cols; j += 1) {
        gridRow.push(new HexTile([i, j], this.hexSize));
      }
      this.push(gridRow);
    }
  }
}
