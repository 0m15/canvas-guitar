import { useEffect, useMemo } from "react";

const scheduled = new Set();

const schedule = (callback) => void scheduled.add(callback);
const unschedule = (callback) => void scheduled.delete(callback);

let t = 0;

export const run = (cb) => {
  try {
    scheduled.forEach((callback) => callback(t));
    t += 0.01;
    requestAnimationFrame(() => run(cb));
    cb && cb(t);
  } catch (e) {}
};

export default function useFrame(callback) {
  const sub = useMemo(() => {
    return () => {
      schedule(callback);
    };
  }, [callback]);

  useEffect(() => {
    sub(callback);

    return () => {
      unschedule(callback);
    };
  }, [callback, sub]);
}
