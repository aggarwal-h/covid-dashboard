import { useEffect } from "react";

export function useHandleClickOutside(ref, callback, ignoreInnerElements) {
  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        (ignoreInnerElements ? ref.current.contains(event.target) : false)
      ) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback, ignoreInnerElements]);
}
