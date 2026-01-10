export const localStorageUtil = {
  // Get value from localStorage, parse JSON if possible
  get: <T>(key: string, defaultValue?: T): T | string => {
    try {
      const item = localStorage.getItem(key); // get item from localStorage

      if (!item) {
        // if item is not found, return default value or empty string
        return defaultValue !== undefined ? defaultValue : ""; // return default value or empty string
      }

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item) as T; // parse item as JSON
      } catch {
        return item as T; // return item as string
      }
    } catch {
      return defaultValue !== undefined ? defaultValue : ""; // return default value or empty string
    }
  },

  // Save value to localStorage as JSON
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value)); // save item to localStorage
    } catch {
      return; // if localStorage fails, return
    }
  },

  // Remove key from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key); // remove item from localStorage
    } catch {
      return; // if localStorage fails, return
    }
  },

  // Clear all localStorage
  clear: (): void => {
    try {
      localStorage.clear(); // clear all localStorage
    } catch {
      return; // if localStorage fails, return
    }
  },
};
