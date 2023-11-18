import React, { useState, useEffect } from "react";
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard';
import { useNavigate,  useParams } from "react-router-dom";


function Opponent() {

  

// Now 'decoded' contains the decoded JWT payload

  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId)
  const Battle = (userId) => {
    navigate(`/Battle/${userId}`)
  }
  return (
      <div className="bg-townN bg-cover h-screen flex flex-col items-center justify-center">
        <h1 className='text-yellow-500 italic font-light uppercase '> F a c e   D A V I D 5 5 5 </h1>
        <div className='h-5/6 w-full flex'>
          <div className=' flex-1   flex justify-center items-center ml-10'>
            <div className=' h-2/3 w-2/5  ml-10'>
              <ProfileCard id={userId}/>
              <div className='bg-red-500 p-3 m-10 rounded-full h-1/6 text-center font-bold '><button onClick={() => Battle(userId)}><h2>Battle</h2></button></div>

            </div>
          </div>
          <div className=' flex-1 flex justify-center items-center mr-10 '>
            <div className=' h-2/3 w-2/5 mr-10'>
              <ProfileCard id={userId} />
              <div className='bg-yellow-500 p-3 m-10 rounded-full h-1/6 text-center font-bold'><h1>Chat</h1></div>
            </div>
          </div>

        </div>

        <Sidebar />
      </div>
  );
}

export default Opponent;
