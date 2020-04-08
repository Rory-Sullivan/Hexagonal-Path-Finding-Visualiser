/**
 * Draws a hexagon corresponding to the given tile on the given canvas context.
 */
function drawHexTile(tile, context) {
  context.save();

  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.fillStyle = tile.fill;

  context.beginPath();
  context.moveTo(tile.xPos, tile.yPos);
  context.lineTo(tile.xPos + tile.width / 2, tile.yPos - tile.height);
  context.lineTo(tile.xPos + tile.width * (3 / 2), tile.yPos - tile.height);
  context.lineTo(tile.xPos + tile.width * 2, tile.yPos);
  context.lineTo(tile.xPos + tile.width * (3 / 2), tile.yPos + tile.height);
  context.lineTo(tile.xPos + tile.width / 2, tile.yPos + tile.height);
  context.closePath();
  context.stroke();
  context.fill();

  context.restore();
}

/**
 * Draws the current state of the grid onto the given canvas context.
 */
export function updateDisplay(context) {
  grid.forEach((row) => {
    row.forEach((tile) => {
      drawHexTile(tile, context);
    });
  });
}

export function drawBackground() {
  bgContext.save();

  bgContext.fillStyle = 'grey';
  bgContext.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  bgContext.restore();

  updateDisplay(bgContext);
}
