import React from "react";

const VerticalList = ({ onItemClick }) => {
  const handleClick = (altText) => {
    let type = altText
    
    onItemClick(type);
  };

  return (
    <div className="max-h-screen overflow-y-auto bg-blue-800 p-4">
      <div role="list" className="flex flex-wrap">
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Fire Energy")}>
          <img src="/energy/fireEn.png" alt="Fire Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Fight Energy")}>
          <img src="/energy/fightEn.png" alt="Fighting Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Dragon Energy")}>
          <img src="/energy/dragonEn.png" alt="Dragon Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Lightning Energy")}>
          <img src="/energy/lightningEn.png" alt="Lightning Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Grass Energy")}>
          <img src="/energy/grassEn.png" alt="Grass Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Bug Energy")}>
          <img src="/energy/bugEn.png" alt="Bug Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Water Energy")}>
          <img src="/energy/waterEn.png" alt="Water Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Ice Energy")}>
          <img src="/energy/iceEn.png" alt="Ice Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Psychic Energy")}>
          <img src="/energy/psychicEn.png" alt="Psychic Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Fairy Energy")}>
          <img src="/energy/fairyEn.png" alt="Fairy Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Metal Energy")}>
          <img src="/energy/metalEn.png" alt="Metal Energy" />
        </div>
        <div role="listitem" className="sm:w-1/6 w-1/4 sm:p-3 p-1" onClick={() => handleClick("Dark Energy")}>
          <img src="/energy/darkEn.png" alt="Dark Energy" />
        </div>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default VerticalList;
