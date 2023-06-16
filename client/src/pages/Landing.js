import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Landing() {
  return (
    <div class="bg-custom-pokeB text-center App">
      <header className="bg-blue min-h-screen flex flex-col items-center justify-center">
        <img
          src="cab.png"
          className="w-11/12 md:w-2/3 mx-auto mt-5"
          alt="Catch a Ball"
        />
        <div className="relative flex flex-col justify-end">
          <img
            src="pok3.png"
            className="w-128 mx-auto mt-0"
            alt="three pokemons"
          />
          <div className="mt-0">
            <Link to="/login">
              <button className="bg-pokeB hover:bg-indigo-950 text-white font-bold py-2 px-4 rounded ">
                <img
                  src="l.png"
                  className="w-auto h-20 mx-auto mt-0"
                  alt="left button"
                />
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-pokeB hover:bg-ind-950 text-white font-bold py-2 px-4 rounded mt-4">
                <img
                  src="r.png"
                  className="w-auto h-20 mx-auto mt-0"
                  alt="right button"
                />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Landing;
