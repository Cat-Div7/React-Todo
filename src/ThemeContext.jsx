import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const STORAGE_KEY_THEME = "themeMode";
  const INITIAL_THEME = false;

  const savedTheme =
    JSON.parse(localStorage.getItem(STORAGE_KEY_THEME)) ?? INITIAL_THEME;
  const [isDark, setIsDark] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemeProvider;
