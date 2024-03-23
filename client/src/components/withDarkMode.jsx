import React, { useState, useEffect } from "react";

const withDarkMode = (WrappedComponent) => {
  return (props) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      let savedMode = localStorage.getItem("displayMode");
      if (!savedMode) {
        const newMode = "light";
        setDarkMode(false);
        localStorage.setItem("displayMode", newMode);
      }
      setDarkMode(savedMode === "dark");
    }, []);

    const toggleTheme = () => {
      const newMode = darkMode ? "light" : "dark";
      setDarkMode(!darkMode);
      localStorage.setItem("displayMode", newMode);
    };

    return (
      <div className={`layout ${darkMode ? "dark" : ""}`}>
        <WrappedComponent {...props} darkMode={darkMode} toggleTheme={toggleTheme} />
      </div>
    );
  };
};

export default withDarkMode;
