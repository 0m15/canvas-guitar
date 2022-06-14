import { useDraw } from "../Canvas";

export function Circle({
  x = 0,
  y = 0,
  radius = 150,
  fillStyle,
  strokeStyle,
  stroke,
  fill
}) {
  useDraw(
    (t, context) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.strokeStyle = "#999";
      context.stroke();
      context.closePath();
    },
    [x, y, radius]
  );
  return null;
}
