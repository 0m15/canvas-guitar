import { useDraw } from "../Canvas";

export function Arc({
  x = 0,
  y = 0,
  radius = 150,
  startAngle = 0,
  endAngle = Math.PI * 2,
  beginPath,
  restore,
  closePath,
  id
}) {
  useDraw(
    (t, context) => {
      if (beginPath) context.beginPath();
      context.arc(x, y, radius, startAngle, endAngle);
      context.stroke();
    },
    [x, y, radius],
    id
  );
  return null;
}
