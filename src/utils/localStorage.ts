export const localStorageUtil = {
  get: <T>(key: string, defaultValue?: T): T | string => {
    try {
      const item = localStorage.getItem(key);
      
      if (!item) {
        return defaultValue !== undefined ? defaultValue : "";
      }
      
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch {
      return defaultValue !== undefined ? defaultValue : "";
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      return;
    }
  },
};
