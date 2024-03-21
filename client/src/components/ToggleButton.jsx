import React from "react";

const ToggleButton = ({ darkMode,toggleTheme}) => {
 

  return (
      <button
          className="toggle-button w-1/3 h-20 "
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
  );
};

export default ToggleButton;
