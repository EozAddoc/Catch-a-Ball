import React from "react";
import { useRouteError } from "react-router-dom";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950 text-white">
      <div className="w-full max-w-md p-4">
        <img
          src="animation/ghost.gif"
          alt="Error GIF"
          className="my-2 max-w-full"
        />
        <div className="text-center"> {/* Center text under the image */}
          <h1 className="text-4xl"> Loading !</h1>
          <p className="text-xl my-4">Searching for new Cards </p>
        </div>
      </div>
    </div>
  );
}
