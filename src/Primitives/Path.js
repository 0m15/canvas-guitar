import { createRef, useMemo } from "react";
import { useDraw } from "../Canvas";

let uid = createRef(0);

export function Path({ x = 0, y = 0, children }) {
  const id = useMemo(() => uid.current + 1, []);

  useDraw(
    (t, context) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
    },
    [x, y],
    "path--" + id
  );
  return <>{children}</>;
}
