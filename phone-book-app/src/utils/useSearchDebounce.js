// useDebounce.js
import { useRef, useEffect, useCallback } from "react";

export default function useDebounce(callback, delay) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  // callback이 변경되면 ref 업데이트
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = useCallback(
    (...args) => {
      // 이전 타이머가 있으면 취소
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 새로운 타이머 설정
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args); // ref를 통해 최신 callback 호출
      }, delay);
    },
    [delay] // callback 제거!
  );

  return debouncedFunction;
}
