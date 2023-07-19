import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const theme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;

    if (isDarkMode) {
      rootElement.setAttribute("data-theme", "dark");
    } else {
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
