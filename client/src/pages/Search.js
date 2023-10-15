import React from 'react';
import Sidebar from '../components/SideBar'
import Searchbar from '../components/SearchBar'
import { useNavigate } from "react-router-dom";


function Search() {
  const navigate = useNavigate();
  const Battle = (e)=>{
    navigate("/Opponent")
  }

    const items = ['Alex','Woirda','Julie','Julie2'];    
    function getRandomColor() {
        // Generating a random color in hex format
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  return (
    <div className='bg-blue-950'>
      <div className="bg-townNN bg-cover h-screen flex flex-col items-center justify-center">
        <div className="search w-1/2  fixed top-28  ">
        <Searchbar/>
        </div>
        <div className="w-1/2  mt-12 bg-transparent">
          <h2 className='text-white font-bold justify-center text-center mt-10 '>{items.length}&nbsp;  R E S U L T S  : </h2>
          <div className=' w-full '>
          {items.map((item, index) => (
  <div key={index} className="flex w-full ">
    <div
      style={{ backgroundColor: getRandomColor() }}
      className='rounded-full  relative p-1 mt-10 w-full h-14 flex '>
        <div className='flex-1'>    
        <div className='bg-white ml-2 rounded-full w-12 h-12'>
  {/* Content of the circular div */}

</div>
</div>
        <div className='flex-1 mt-3'>  <p>{item}</p></div>
        <div className='flex-1 text-white font-bold mt-3 w-1/6'><p>L V L     2 1 3</p></div>
    </div>
    
    <div className='bg-yellow-300 text-center font-bold  rounded-full ml-6 w-25 mt-10  '> <div className='mt-2'><button onClick={Battle}><p className='mt-4'>B A T T L E</p></button></div></div> 
  </div>
))}

          </div>
       
        </div>
      </div>
      <Sidebar/>
    </div>
  );
}

export default Search;
