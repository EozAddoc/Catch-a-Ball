import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Landing() {
  return (
    <div className="w-full h-screen bg-night bg-cover">
      <header className="flex flex-col items-center justify-center ">
        <img
          src="cab2.png"
          className="w-full lg:w-10/11 md:w-2/3 lg:mt-0 sm:w-3/4 mt-[50px]"
          alt="Catch a Ball"
        />
      </header>
      <div className="flex flex-col items-center justify-center ">
        <div className="relative flex flex-col justify-end">
          <img
            src="pok3.png"
            className="w-full lg:w-128 md:mt-[-50px] mt-[50px]"
            alt="three pokemons"
          />
          <div className="md:flex-row md:gap-96 sm:gap-16 gap-8 items-center justify-center flex flex-col md:mt-0 mt-20 pb-[50px]">
            <button className="bg-pokeB text-white font-bold py-2 lg:px-4 md:px-2 sm:px-2 rounded ">
              <Link to="/login">
                <img
                  src="lo.png"
                  className="w-auto h-20 transform md:rotate-12 transform-origin-0 border-1 border-solid border-black rounded-full"
                  alt="login button"
                />
              </Link>
            </button>

            <button className="bg-pokeB text-white font-bold py-2 lg:px-4 md:px-2 sm:px-2 mt-4">
              <Link to="/signup">
                <img
                  src="reg.png"
                  className="w-auto h-20 transform md:-rotate-12 transform-origin-0 border-1 border-solid border-black"
                  alt="signup button"
                />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
