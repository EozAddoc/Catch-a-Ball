import React from 'react';
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard'
import { useNavigate,  useParams } from "react-router-dom";


function Battle() {
  const { userId } = useParams();
  console.log(userId)
  return (
    <div className='bg-blue-700'>
      <div className="bg-routeN bg-cover h-screen flex flex-col items-center justify-center">
        <div>
          <div className=' bg-blue-950'>
            <div className="absolute bottom-28 left-52 h-2/3 w-1/4 ">
              <ProfileCard />
             
            </div>
            <div className='heart w-1/3 h-1/5 absolute bottom-16 left-1/2 flex  '>
                <img src='heartb.png' className='h-1/2 m-3'>
                </img>
                <img src='heartb.png' className='h-1/2 m-3 '>
                </img>
                <img src='heart(2).png' className='h-1/2 m-3'>
                </img>
                <img src='heart(2).png' className='h-1/2 m-3'>
                </img>
                <img src='heart(2).png' className='h-1/2 m-3'>
                </img>
              </div>
            <div className="absolute bottom-10   left-20 bg-blue-500" style={{ height: '38px', width: '750px', borderRadius: '50%' }}>
            </div>
          </div>
          <div>
            <div className="absolute bottom-80 right-48 h-2/5 w-1/6 ">
              <ProfileCard />
            </div>
            <div className='heart  w-1/3 h-1/6 absolute bottom-80 right-96 flex  '>
            <img src='heartG.png' className='h-1/3 m-3'>
                </img>
                <img src='heartG.png' className='h-1/3 m-3 '>
                </img>
                <img src='heartG.png' className='h-1/3 m-3 '>
                </img>
                <img src='heart(2).png' className='h-1/3 m-3'>
                </img>
                <img src='heart(2).png' className='h-1/3 m-3'>
                </img>
              </div>
            <div className="absolute bottom-72 right-36 bg-blue-500" style={{ height: '15px', width: '400px', borderRadius: '50%' }}>

            </div>

          </div>



        </div>



      </div>
      <Sidebar />
    </div>
  );
}

export default Battle;
