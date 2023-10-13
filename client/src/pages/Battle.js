import React from 'react';
import Sidebar from '../components/SideBar'

function Battle() {
  return (
    <div className='bg-blue-700'>
      <div className="bg-arena bg-cover h-screen flex flex-col items-center justify-center">
        <div className="w-1/2 mb-4">
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-500 sr-only dark:text-white">
              Search
            </label>
            <div className="relative bg-white opacity-50 rounded-full">
            <input
  type="search"
  id="default-search"
  className="bg-transparent w-full p-4 pl-10 text-sm rounded-lg outline-none"
  placeholder="Search For Adversaries"
  required
/>

              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 opacity-0 bg-yellow-400"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 h-1/2 p-4 bg-transparent">
          <h1 className='text-white font-bold justify-center center'> 12 R E S U L T S  : </h1>
        <div className="relative bg-yellow-500 m-4 rounded-full">
          <h2>hbbi</h2>
        </div>
        <div className="relative bg-red-500 m-4 rounded-full">
          <h2>hbbi</h2>
        </div>
        <div className="relative bg-green-500 m-4  rounded-full">
          <h2>     hbbi</h2>
        </div>
        <div className="relative bg-blue-200 m-4 rounded-full">
          <h2><ul></ul>hbbi</h2>
        </div>
        <div className="relative bg-purple-500 m-4  rounded-full">
          <h2>hbbi</h2>
        </div>
        </div>+
      </div>
      <Sidebar/>
    </div>
  );
}

export default Battle;
