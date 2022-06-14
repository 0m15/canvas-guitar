import { useDraw } from "../Canvas";

export function Line({
  x,
  y,
  x1 = 100,
  y1 = 100,
  closePath,
  restore,
  moveTo = true,
  fillStyle,
  strokeStyle,
  stroke,
  fill,
  id
}) {
  useDraw(
    (t, context) => {
      if (x !== undefined && y !== undefined) context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = "#999";
      context.lineWidth = 4;

      context.stroke();
      if (closePath) context.closePath();
      if (restore) context.restore();
    },
    [x, y, x1, y1],
    id
  );
  return null;
}
