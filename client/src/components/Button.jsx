import React from "react";

function Button(props) {
  return (
    <button
      className="rounded-full w-full bg-blue-800 text-white m-1 px-4 py-2 hover:bg-blue-600"
    >
      {props.name}
    </button>
  );
}

export default Button;
