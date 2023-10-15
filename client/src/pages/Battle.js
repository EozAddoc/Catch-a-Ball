import React from 'react';
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard'

function Battle() {
  return (
    <div className='bg-blue-700'>
      <div className="bg-routeN bg-cover h-screen flex flex-col items-center justify-center">
        <div>
          <div className=' '>
<div className="absolute bottom-28 left-48 " style={{ height: '600px', width: '450px' }}>
<ProfileCard/>
<div className='heart bg-blue-200 w-full h-1/5 absolute bottom-24 left-96  '>
  <p>heart </p>
</div>
</div>
          <div className="absolute bottom-10   left-20 bg-blue-500" style={{ height: '38px', width: '750px', borderRadius: '50%' }}>
</div>
          </div>
          <div>
          <div className="absolute bottom-80 right-80 " style={{ height: '300px', width: '225px' }}>
<ProfileCard/>
<div className='heart bg-blue-200 w-full h-1/5 absolute bottom-20 right-96  '>
  <p>heart </p>
</div>

</div>
<div className="absolute bottom-72  right-60 bg-blue-500" style={{ height: '20px', width: '400px', borderRadius: '50%' }}>

</div>

          </div>



        </div>



      </div>
      <Sidebar/>
    </div>
  );
}

export default Battle;
