import 'chai/register-expect.js';

import Graph from '../algorithms/Graph.js';
import GraphNode from '../algorithms/GraphNode.js';

describe('Tests for the Graph class', () => {
  let grid;
  before('Sets up a basic grid for testing', () => {
    grid = [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ];
  });

  it('Test that it returns what we expect', () => {
    const graph = new Graph(grid);

    expect(graph).to.have.lengthOf(4);
    expect(graph[0]).to.have.lengthOf(5);
    expect(graph[0][0]).to.be.instanceOf(GraphNode);
    expect(graph[3][4].neighbours).to.have.lengthOf(3);
  });
});
