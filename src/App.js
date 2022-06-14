import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSpring } from "react-spring";
import Canvas from "./Canvas";
import { Circle } from "./Primitives/Circle";
import { SplinePath } from "./Primitives/SplinePath";
import "./styles.css";
import useFrame from "./useFrame";

const state = {
  mouse: [0, 0, false],
  dy: 0
};

function String({ x1 = 0, x2 = window.innerWidth, y = 0, padding = 10 }) {
  const [points, setPoints] = useState([
    [x1 + padding, 0],
    [(x2 - x1) / 2, 0],
    [x2 - padding, 0]
  ]);

  useFrame(() => {
    const {
      mouse: [mx, my, md],
      dy
    } = state;

    setPoints(() => [
      [x1 + padding, 0],
      [mx * x2, ((-0.5 + dy) * 2 * window.innerHeight) / 4],
      [x2 - padding, 0]
    ]);
  });

  return <SplinePath x={0} y={y} points={points} />;
}

export default function App() {
  const [points, setPoints] = useState([
    [10, 0],
    [window.innerWidth / 2, 0],
    [window.innerWidth - 10, 0]
  ]);
  const mouseDown = useRef(false);

  const [_, set, api] = useSpring(() => ({
    y: 0,
    config: {
      tension: 70,
      friction: 10
    },
    onChange: (e) => {
      state.dy = e.value.y;
    }
  }));

  useEffect(() => {
    const onMouseMove = (e) => {
      if (mouseDown.current) {
        set({
          y: e.clientY / window.innerHeight
        });
      }

      state.mouse = [
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
        mouseDown.current
      ];
    };

    const onMouseDown = (e) => {
      mouseDown.current = true;
      set({
        y: e.clientY / window.innerHeight
      });
    };
    const onMouseUp = (e) => {
      mouseDown.current = false;
      state.mouse = [e.clientX / window.innerWidth, 0, false];
      set({
        y: 0.5
      });
    };
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove, { passive: true });
      window.removeEventListener("mousedown", onMouseDown, { passive: true });
      window.removeEventListener("mouseup", onMouseUp, { passive: true });
    };
  }, []);

  return (
    <div className="App">
      <Canvas>
        {/* <SplinePath x={0} y={window.innerHeight / 2} points={points} /> */}
        <String x1={0} x2={window.innerWidth} y={window.innerHeight / 2} />
        {/* <String x1={0} x2={window.innerWidth} y={window.innerHeight / 2 + 20} /> */}
        <Circle
          x={points[1][0]}
          y={
            points[1][1] > window.innerHeight / 2 - window.innerHeight / 2
              ? window.innerHeight / 2 + points[1][1] + 8
              : window.innerHeight / 2 + points[1][1] - 8
          }
          radius={8}
        />
      </Canvas>
    </div>
  );
}
