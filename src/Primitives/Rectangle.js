import { useDraw } from "../Canvas";

export function Rectangle({
  x = 0,
  y = 0,
  width = 150,
  height = 150,
  fillStyle,
  strokeStyle,
  stroke,
  fill
}) {
  useDraw(
    (t, context) => {
      context.beginPath();
      context.rect(x, y, width, height);
      context.strokeStyle = "#999";
      // context.fill();
      context.stroke();
    },
    [x, y, width, height]
  );
  return null;
}
