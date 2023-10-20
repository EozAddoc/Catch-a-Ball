import React from 'react';
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from "react-router-dom";


function Opponent() {
  const navigate = useNavigate();
  const Battle = (e) => {
    navigate("/Battle")
  }
  return (
    <div className='bg-blue-700'>
      <div className="bg-townN bg-cover h-screen flex flex-col items-center justify-center">
        <div className='h-5/6 w-full flex'>
          <div className=' flex-1   flex justify-center items-center'>
            <div className=' h-2/3 w-2/5  '>
              <ProfileCard />
              <div className='bg-red-500 p-3 m-16 rounded-full h-1/6 text-center font-bold '><button onClick={Battle}><h2>Battle</h2></button></div>

            </div>
          </div>
          <div className=' flex-1 p-2 flex justify-center items-center'>
            <div className=' h-2/3 w-2/5 '>
              <ProfileCard />
              <div className='bg-yellow-500 p-3 m-16 rounded-full h-1/6 text-center font-bold'><h1>Chat</h1></div>
            </div>
          </div>

        </div>

        <Sidebar />
      </div>
    </div>
  );
}

export default Opponent;
