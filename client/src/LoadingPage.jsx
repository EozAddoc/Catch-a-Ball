import React from "react";
import { useRouteError } from "react-router-dom";

export default function LoadingPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-950 text-white">
      <div className="md:w-1/2 p-4"> {/* Left side for the GIF */}
        <img
          src="runPikachu.gif" // Replace with the actual URL of your GIF
          alt="Error GIF"
          className="my-2 max-w-full" // Ensure the GIF doesn't exceed its container
        />
      </div>
      <h1 className="text-4xl">Oops!</h1>
      <div className="md:w-1/2 p-4"> {/* Right side for the text */}
        <p className="text-xl my-4">Sorry, an unexpected error has occurred.</p>
        <p className="italic">{error.statusText || error.message}</p>
      </div>
    </div>
  );
}
