import {React,useEffect,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import withDarkMode from "../components/withDarkMode";
import ToggleButton from "../components/ToggleButton";
 ;

function Landing({ darkMode, toggleTheme }) {
  return (
<div className={`layout ${darkMode ? "dark" : ""}`}>
      <div className="h-screen dark:bg-landing bg-day bg-cover ">
      <div className="absolute top-0 right-0">
            <button
              className="toggle-button ml-2 p-4 h-20"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        <header className="flex flex-col h-screen  items-center justify-center ">
          <img
            src="cab2.png"
            className="w-full lg:w-10/11 md:w-2/3 sm:w-3/4 mt-0"
            alt="Catch a Ball"
          />
     
          <div className="flex flex-col justify-end">
            <img
              src="pok3.png"
              className="w-full lg:w-128 lg:mt-[-100px] md:mt-[-100px] sm:mt-[-100px] "
              alt="three Pokémons"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-x-96 gap-y-6 mt-10">
              <Link to="/login">
                <button className="bg-pokeB text-white font-bold py-2 lg:px-4 md:px-2 sm:px-2">
                  <img
                    src="lo.png"
                    className="h-20 md:transform md:rotate-12 md:transform-origin-0"
                    alt="login button"
                  />
                </button>
              </Link>
            
            
              <Link to="/signup">
                <button className="bg-pokeB text-white font-bold py-2 lg:px-4 md:px-2 sm:px-2">
                  <img
                    src="reg.png"
                    className="h-20 md:transform md:-rotate-12 md:transform-origin-0"
                    alt="register button"
                  />
                </button>
              </Link>
            </div>
          </div>
        </header>
      </div>
      </div>
  );
}

export default withDarkMode(Landing);
