/**
 * Takes in a click event and returns the row and column of our the tile that
 * was clicked on.
 */
export default function getCursorPosition(event) {
  const rect = animationCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Get column
  const col = Math.floor((x - hexSize.width * 0.25) / (hexSize.width * 1.5));

  // Get row
  const row =
    col % 2 === 0
      ? Math.floor(y / (hexSize.height * 2))
      : Math.floor((y - hexSize.height) / (hexSize.height * 2));

  return [row, col];
}
