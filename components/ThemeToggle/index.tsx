import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FaMoon, FaSun } from "react-icons/fa";
config.autoAddCss = true;

const ThemeToggle: React.FC = () => {
  const theme = localStorage.getItem("theme");
  const rootElement = document.documentElement;
  const [isDarkMode, setIsDarkMode] = useState(
    theme === "light" ? false : true
  );
  useEffect(() => {
    if (theme && rootElement.getAttribute("data-theme") !== theme) {
      rootElement.setAttribute("data-theme", theme);
      setIsDarkMode(theme === "light" ? false : true);
    }
  }, [theme, rootElement]);
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      rootElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      rootElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode, rootElement]);

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
