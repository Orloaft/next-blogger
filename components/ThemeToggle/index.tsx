import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const theme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(
    theme === "light" ? false : true
  );
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      setIsDarkMode(theme === "light" ? false : true);
    }
  }, [theme]);
  useEffect(() => {
    const rootElement = document.documentElement;

    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      rootElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      rootElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <button onClick={toggleMode}>Toggle Theme</button>
    </div>
  );
};

export default ThemeToggle;