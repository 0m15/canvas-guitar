import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { run } from "./useFrame";

const initialState = {
  canvas: null,
  context: null,
  dpi: 1,
  mouse: { coords: [0, 0], pressed: false },
  drawCalls: new Array(9999),
  size: {
    width: null,
    height: null
  }
};

export const CanvasContext = createContext(initialState);

export function useCanvas() {
  const context = useContext(CanvasContext);
  return context;
}

let index = 0;

export function useDraw(cb, deps, type) {
  const { drawCalls } = useCanvas();
  const id = useMemo(() => {
    index = index + 1;
    return index;
  }, []);

  return useEffect(() => {
    if (!drawCalls.current) return;

    drawCalls.current[id] = { cb, type };

    return () => {
      drawCalls.current = drawCalls.current.filter(
        ({ cb: cb__ }) => cb__ !== cb
      );
    };
  }, [deps, id]);
}

export default function Canvas({ children }) {
  const [state, setState] = useState(initialState);
  const drawCalls = useRef([]);
  const ref = useRef();

  const dpi = Math.min(2, window.devicePixelRatio || 1);
  const scale = useCallback(() => {
    const { clientWidth: width, clientHeight: height } = ref.current.parentNode;

    ref.current.width = width * dpi;
    ref.current.height = height * dpi;

    ref.current.style.width = width + "px";
    ref.current.style.height = height + "px";

    ref.current.getContext("2d").scale(dpi, dpi);
  }, [dpi]);

  useEffect(() => {
    scale(ref.current);
    const ctx = ref.current.getContext("2d");

    const clear = () => {
      const w = ref.current.width / dpi;
      const h = ref.current.height / dpi;
      ctx.clearRect(0, 0, w, h);
    };

    setState((cur) => ({
      ...cur,
      dpi,
      canvas: ref.current,
      context: ref.current.getContext("2d"),
      size: {
        width: ref.current.width / dpi,
        height: ref.current.height / dpi
      },
      clear,
      drawCalls
    }));

    run((t) => {
      clear();

      // ctx.save();
      for (let i = 0; i < drawCalls.current.length; i += 1) {
        let cb = drawCalls.current[i]?.cb;
        cb && cb(t, ctx);
      }
      // drawCalls.current.forEach(({ cb, type }) => {
      // });
      // ctx.restore();
    });
  }, [scale, drawCalls, dpi]);

  useEffect(() => {
    const onMouseDown = (evt) => {
      setState((cur) => ({
        ...cur,
        mouse: {
          ...cur.mouse,
          pressed: true
        }
      }));
    };

    const onMouseUp = (evt) => {
      setState((cur) => ({
        ...cur,
        mouse: {
          ...cur.mouse,
          pressed: false
        }
      }));
    };

    const onMouseMove = (evt) => {
      // setState((cur) => ({
      //   ...cur,
      //   mouse: {
      //     ...cur.mouse,
      //     coords: [evt.x, evt.y]
      //   }
      // }));
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [setState]);

  return (
    <>
      <canvas ref={ref} />
      <CanvasContext.Provider value={state}>{children}</CanvasContext.Provider>
    </>
  );
}
