import React from 'react';
import Sidebar from '../components/SideBar'
import withDarkMode from "../components/withDarkMode";

function Shop({ darkMode, toggleTheme }) {
  return (
    <div className='bg-blue-700'>
    <div className="bg-shopN bg-cover h-screen flex flex-col items-center justify-center">
<h1 className='font-bold text-white tracking-widest'> Coming Soon</h1>
      
      <Sidebar/>
      </div>
    </div>
  );
}

export default Shop;
