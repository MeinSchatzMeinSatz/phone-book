// useDebounce.js
import { useRef, useCallback } from "react";

export default function useDebounce(callback, delay) {
  const timerRef = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      // 이전 타이머가 있으면 취소
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 새로운 타이머 설정
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
}
