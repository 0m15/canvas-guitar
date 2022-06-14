import { useDraw } from "../Canvas";

export function Group({
  x = 0,
  y = 0,
  fillStyle,
  strokeStyle,
  stroke,
  fill,
  children
}) {
  console.log("group");
  useDraw(
    (t, context) => {
      context.translate(100, y);
      context.strokeStyle = strokeStyle;
    },
    [x, y],
    "group"
  );
  return children;
}
