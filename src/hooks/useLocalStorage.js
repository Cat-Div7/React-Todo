import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (
        storedValue &&
        storedValue !== "undefined" &&
        storedValue !== "null"
      ) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Error loading from localStorage", error);
      setValue([]);
    } finally {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1500);
    }
  }, [key]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    }
  }, [key, value, isLoaded]);

  const reset = () => setValue(initialValue);

  return { value, setValue, isLoaded, reset };
}
