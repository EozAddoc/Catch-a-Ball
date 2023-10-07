import React from "react";
import { useNavigate } from "react-router-dom";


export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/home");
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-950 text-white">
      <div className="md:w-1/2 lg:w-1/3 p-8 md:p-12 lg:p-16"> 
        <img
          src="clown.gif" 
          alt="Error GIF"
          className="my-4 max-w-full" 
        />
      </div>
      <div className="md:w-1/2 lg:w-2/3 flex flex-col justify-center items-center -translate-x-2 md:-translate-x-16 lg:-translate-x-32">
        {/* Right side for the text */}
        <h1 className="sm:text-lg md:text-9xl lg:text-[700px] mb-6 font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-yellow-400 sm:px-6 text-black md:px-4 md:m-2 text-xl sm:text-xs rounded rotate-12 absolute">
  Page Not Found
</div>
        <button className="mt-2 md:mt-3" onClick={handleGoHome}>
          <a
            className="relative inline-block text-sm font-medium text-black group "
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
            <span className="relative block px-8 py-3 md:px-16 md:py-3 lg:px-20 lg:py-4 bg-yellow-500 border border-current">
             Go Home
             
            </span>
          </a>
        </button>
      </div>
    </div>
  );
}
