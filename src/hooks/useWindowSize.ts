import { useState, useEffect } from "react";
import { debounce } from "lodash";

export function useWindowSize(debounceDelay = 100) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedResize = debounce(handleResize, debounceDelay);
    debouncedResize();

    window.addEventListener("resize", debouncedResize);

    return () => {
      debouncedResize.cancel();
      window.removeEventListener("resize", debouncedResize);
    };
  }, [debounceDelay]);

  return size;
}