import { useState } from "react";
import { localStorageUtil } from "../utils/localStorage";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // read from localStorage on init
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        localStorageUtil.set(key, initialValue);
        return initialValue;
      }
      
      const parsedItem = localStorageUtil.get<T>(key);
      if (typeof parsedItem === "string" && parsedItem === "") {
        localStorageUtil.set(key, initialValue);
        return initialValue;
      }
      return (parsedItem as T) || initialValue;
    } catch {
      return initialValue;
    }
  });

  // update state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorageUtil.set(key, valueToStore);
  };

  return [storedValue, setValue] as const;
};
