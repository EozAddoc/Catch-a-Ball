import Profile from "../components/EditProfile";
import Sidebar from "../components/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
function ProfilePage() {
  const [userData, setUserData] = useState("");
  

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios
      .get( process.env.REACT_APP_URL + "/user")
      .then((res) => {
        if (res.data.Status === "Success") {
          setUserData(res.data.userData);
         
        }
      })
      .catch((err) => console.error("error", err));
  }, []);

  return (
    <div className='bg-gray-700'>
      <div className="h-screen bg-profileN bg-cover w-screen flex items-center justify-center">
        <Sidebar />
        <Profile id={userData.id}/>
      </div>
    </div>

  );
}

export default ProfilePage;
