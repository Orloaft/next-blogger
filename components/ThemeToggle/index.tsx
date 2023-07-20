import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FaMoon, FaSun } from "react-icons/fa";
import useLocalStorage from "@/hooks/useLocalStorage";
import useRootRef from "@/hooks/useRootRef";
config.autoAddCss = true;

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  let rootElement = useRootRef();
  const [isDarkMode, setIsDarkMode] = useState(
    theme === "light" ? false : true
  );

  useEffect(() => {
    if (rootElement.current !== null) {
      if (theme && rootElement.current.getAttribute("data-theme") !== theme) {
        rootElement.current.setAttribute("data-theme", theme);
        setIsDarkMode(theme === "light" ? false : true);
      }
    }
  }, [theme, rootElement]);
  useEffect(() => {
    if (rootElement.current !== null) {
      if (isDarkMode) {
        setTheme("dark");
        rootElement.current.setAttribute("data-theme", "dark");
      } else {
        setTheme("light");
        rootElement.current.setAttribute("data-theme", "light");
      }
    }
  }, [isDarkMode, rootElement, setTheme]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div onClick={toggleMode}>
      <label className={styles["checkbox-label"]}>
        <FaMoon size="small" fill="#6acfc7" />
        <FaSun size="small" fill="orange" />
        <span
          className={
            !isDarkMode
              ? `${styles.ball} ${styles.left}`
              : ` ${styles.ball} ${styles.right}`
          }
        ></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
