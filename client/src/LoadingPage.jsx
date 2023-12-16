import React from "react";
import { useRouteError } from "react-router-dom";

export default function LoadingPage() {


  return (
    <div className="flex flex-col md:flex-col items-center justify-center min-h-screen bg-blue-950 text-white">
      <div className="md:w-1/2 p-4"> 
        <img
          src="ghost.gif" 
          alt="Error GIF"
          className="my-2 max-w-full" 
        />
      </div>
      <h1 className="text-4xl"> Loading !</h1>
        <p className="text-xl my-4">Searching for new Cards </p>
    </div>
  );
}
