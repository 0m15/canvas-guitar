import { Arc } from "./Shapes/Arc";
import { Line } from "./Shapes/Line";
import { Path } from "./Shapes/Path";

const Glyphs = {
  a: {},
  B: {
    bowls: [
      {
        x: 1,
        y: 1,
        r: 1,
        start: -Math.PI / 2,
        end: Math.PI / 2
      },
      {
        x: 1,
        y: 2,
        r: 1,
        start: -Math.PI / 2,
        end: Math.PI / 2
      }
    ],
    stem: {}
  }
};

export default Glyphs;
