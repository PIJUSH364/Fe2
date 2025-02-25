import React, { useEffect, useRef } from "react";

export const useDebouncedEffect = (callback, dependencies, delay = 500) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [...dependencies, delay]);
};
