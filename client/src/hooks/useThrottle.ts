import { useRef, useCallback } from "react";

type AnyFunction = (...args: any[]) => any;

const useThrottle = <T extends AnyFunction>(callback: T, delay: number): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        return callback(...args);
      }
    },
    [callback, delay]
  ) as T;
};

export default useThrottle;
