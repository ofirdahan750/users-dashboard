import { useEffect, useState } from "react";

// waits before updating the value, useful for search inputs
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // set timer to update value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cancel timer if value changes before delay ends
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
