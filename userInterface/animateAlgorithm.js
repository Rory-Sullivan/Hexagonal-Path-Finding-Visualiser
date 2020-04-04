function animateSteps() {
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

function animateAlgorithm(grid, algorithmName) {
  if (start.length === 0) {
    // eslint-disable-next-line no-alert
    window.alert('Please select a starting point');
    return;
  }
  if (end.length === 0) {
    // eslint-disable-next-line no-alert
    window.alert('Please select an end point');
    return;
  }

  canvas.removeEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Calculating...';

  if (d) {
    for (let i = 0; i < m; i += 1) {
      for (let j = 0; j < n; j += 1) {
        const hex = hexes[i][j];
        if (hex.fill === 'paleGreen' || hex.fill === 'lightBlue') {
          hex.fill = 'white';
        }
      }
    }
  }

  switch (algorithm) {
    case 'dijkstra':
      d = new Dijkstra(grid, start, end);
      break;

    case 'aStar':
      d = new AStar(grid, start, end);
      break;

    case 'biasedAStar':
      d = new BiasedAStar(grid, start, end);
      break;

    default:
      throw new Error('Not a valid algorithm');
  }

  setTimeout(animateSteps, delay);
}
