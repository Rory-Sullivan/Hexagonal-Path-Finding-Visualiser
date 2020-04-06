/* globals grid, bgCanvas, bgContext */

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

export function animateSteps() {
  const checkedNodes = d.step();
  if (checkedNodes) {
    for (let i = 0; i < checkedNodes.length; i += 1) {
      const node = checkedNodes[i];
      if (!node.isStart && !node.isEnd) {
        hexes[node.row][node.col].fill = 'paleGreen';
      }
    }
  }

  if (d.pathFound) {
    if (d.noPath) {
      // eslint-disable-next-line no-alert
      window.alert('No path possible');
    } else {
      for (let i = 1; i < d.path.length - 1; i += 1) {
        const node = d.path[i];
        hexes[node.row][node.col].fill = 'lightBlue';
      }
    }
    canvas.addEventListener('mousedown', addWallBegin);
    instructions.innerHTML = 'Done!';
  } else {
    setTimeout(animateSteps, delay);
  }
  animate();
}
