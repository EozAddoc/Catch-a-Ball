import React, { useState } from 'react';
import List from './Menu/List';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed z-30 flex items-center cursor-pointer left-10 top-6"
          fill="#FFFFFF"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 left-0 w-full md:w-[40vw] lg:w-[30vw] bg-yellow-500 md:p-10 xl:pl-20 text-white fixed min-h-screen xl:h-full z-40 ease-in-out duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <h3 className="mt-[30px] text-4xl font-semibold text-white"><List /></h3>
      </div>
    </>
  );
};

export default Sidebar;
