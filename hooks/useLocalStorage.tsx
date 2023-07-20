import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  // Set initial state
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      // Access localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or if null, return initialValue
      return item ? item : initialValue;
    }
    return initialValue;
  });

  // Return a wrapper for useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    if (typeof window !== "undefined") {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      item && setStoredValue(item);
    }
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
