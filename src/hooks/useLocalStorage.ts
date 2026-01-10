import { useState } from "react";
import { localStorageUtil } from "../utils/localStorage";

// syncs state with localStorage, keeps data between page reloads
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // read from localStorage on init
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // nothing saved yet, use initial value
      if (item === null) {
        localStorageUtil.set(key, initialValue);
        return initialValue;
      }
      
      const parsedItem = localStorageUtil.get<T>(key);
      // empty string means no real value, use initial
      if (typeof parsedItem === "string" && parsedItem === "") {
        localStorageUtil.set(key, initialValue);
        return initialValue;
      }
      // return saved value or fallback to initial
      return (parsedItem as T) || initialValue;
    } catch {
      // if localStorage fails, just use initial value
      return initialValue;
    }
  });

  // update state and localStorage together
  const setValue = (value: T | ((val: T) => T)) => {
      // handle function updates like setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorageUtil.set(key, valueToStore);
  };

  return [storedValue, setValue] as const;
};
