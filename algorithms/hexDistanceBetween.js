/**
 * Calculates the distance between two spaces on our hexagonal grid.
 */
export default function hexDistanceBetween(x, y) {
  const dis1 = Math.abs(x[1] - y[1]);

  let penalty;

  if (
    (x[1] % 2 === 0 && y[1] % 2 === 1 && x[0] < y[0]) ||
    (x[1] % 2 === 1 && y[1] % 2 === 0 && x[0] > y[0])
  ) {
    penalty = 1;
  } else {
    penalty = 0;
  }
  const dis2 = Math.abs(x[0] - y[0]) + Math.floor(dis1 / 2) + penalty;

  const dis = Math.max(dis1, dis2);

  return dis;
}
