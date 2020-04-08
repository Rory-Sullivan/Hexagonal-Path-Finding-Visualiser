import Dijkstra from '../algorithms/Dijkstra.js';
import AStar from '../algorithms/AStar.js';
import BiasedAStar from '../algorithms/BiasedAStar.js';
import { updateDisplay } from './display.js';
import addWallBegin from './addWalls.js';

function animateAlgorithmEnd(algorithm) {
  if (algorithm.noPath) {
    // eslint-disable-next-line no-alert
    window.alert('No path possible');
  } else {
    algorithm.path.forEach((node) => {
      if (!node.isStart && !node.isEnd) {
        grid[node.row][node.col].fill = 'lightBlue';
      }
    });
  }

  const algButtonsContainer = document.getElementById('algorithmButtons');
  for (let i = 0; i < algButtonsContainer.children.length; i += 1) {
    const button = algButtonsContainer.children[i];
    button.disabled = false;
  }

  const mazeButtonsContainer = document.getElementById('mazeButtons');
  for (let i = 0; i < mazeButtonsContainer.children.length; i += 1) {
    const button = mazeButtonsContainer.children[i];
    button.disabled = false;
  }

  animationCanvas.addEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Done!';
}

function animateAlgorithmStep(algorithm) {
  const checkedNodes = algorithm.step();
  if (checkedNodes) {
    checkedNodes.forEach((node) => {
      if (!node.isStart && !node.isEnd) {
        grid[node.row][node.col].fill = 'paleGreen';
      }
    });
  }

  if (algorithm.pathFound) {
    animateAlgorithmEnd(algorithm);
  } else {
    timeoutId = setTimeout(animateAlgorithmStep, animationDelay, algorithm);
  }

  updateDisplay(animationContext);
}

export default function animateAlgorithmBegin(algorithmName) {
  if (!grid.start) {
    // eslint-disable-next-line no-alert
    window.alert('Please select a starting point');
    return;
  }
  if (!grid.end) {
    // eslint-disable-next-line no-alert
    window.alert('Please select an end point');
    return;
  }

  animationCanvas.removeEventListener('mousedown', addWallBegin);
  instructions.innerHTML = 'Calculating...';

  const algButtonsContainer = document.getElementById('algorithmButtons');
  for (let i = 0; i < algButtonsContainer.children.length; i += 1) {
    const button = algButtonsContainer.children[i];
    button.disabled = true;
  }

  const mazeButtonsContainer = document.getElementById('mazeButtons');
  for (let i = 0; i < mazeButtonsContainer.children.length; i += 1) {
    const button = mazeButtonsContainer.children[i];
    button.disabled = true;
  }

  // If an algorithm has already been run we will reset the tiles to the correct
  // colour.
  grid.forEach((row) => {
    row.forEach((tile) => {
      if (tile.fill === 'paleGreen' || tile.fill === 'lightBlue') {
        tile.fill = 'white';
      }
    });
  });

  let algorithm;
  switch (algorithmName) {
    case 'dijkstra':
      algorithm = new Dijkstra(grid);
      break;

    case 'aStar':
      algorithm = new AStar(grid);
      break;

    case 'biasedAStar':
      algorithm = new BiasedAStar(grid);
      break;

    default:
      throw new Error('Not a valid algorithm');
  }

  timeoutId = setTimeout(animateAlgorithmStep, animationDelay, algorithm);
}
