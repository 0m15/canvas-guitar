import { useDraw } from "../Canvas";

export function Restore({ x = 0, y = 0, children }) {
  useDraw(
    (t, context) => {
      context.restore();
    },
    [x, y]
  );
  return null;
}
