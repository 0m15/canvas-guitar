import { useDraw } from "../Canvas";
import Spline from "cubic-spline";
import { useMemo } from "react";

export function SplinePath({
  x = 0,
  y = 0,
  points = [
    [10, 10],
    [20, 50]
  ],
  f = 0.9,
  fillStyle,
  strokeStyle,
  stroke,
  fill
}) {
  const spline = useMemo(() => {
    const spX = new Spline(
      points.map((d, i) => i),
      points.map((d) => d[0])
    );
    const spY = new Spline(
      points.map((d, i) => i),
      points.map((d) => d[1])
    );
    const ret = [];
    for (let i = 0; i <= points.length - 1; i += 0.01) {
      ret.push([spX.at(i), spY.at(i)]);
    }
    return ret;
  }, [points]);

  useDraw(
    (t, context) => {
      context.save();
      context.beginPath();
      context.lineCap = "round";
      context.lineJoint = "bevel";
      context.translate(x, y);

      spline.forEach(([x1, y1], i) => void context.lineTo(x1, y1));
      context.strokeStyle = "#999";

      context.lineWidth = 1;
      context.stroke();

      context.restore();
    },
    [x, y, spline]
  );
  return null;
}
