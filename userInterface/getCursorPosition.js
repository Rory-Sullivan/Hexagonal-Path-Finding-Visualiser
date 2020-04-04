/* global hexSize */

/**
 * Takes in a click event and returns the row and column of our the tile that
 * was clicked on.
 */
export default function getCursorPosition(event) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Get column
  const col = Math.floor((x - hexSize.width * 0.25) / (hexSize.width * 1.5));

  // Get row
  let row;
  if (col % 2 === 0) {
    row = Math.floor(y / (hexSize.height * 2));
  } else {
    row = Math.floor((y - hexSize.height) / (hexSize.height * 2));
  }

  return [row, col];
}
