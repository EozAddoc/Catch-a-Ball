import Profile from "../components/EditProfile";
import Sidebar from "../components/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
function ProfilePage() {
  const [mess, setMess] = useState("");
  const [userData, setUserData] = useState("");
  

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios
      .get("http://" + process.env.REACT_APP_URL + ":1117/user")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("in here")
          setUserData(res.data.userData);
         
        } else {
          console.log("oh no")
          setMess(res.data.err);
        }
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div className='bg-gray-700'>
      <div className="min-h-screen bg-profileN bg-cover h-screen flex items-center justify-center">
        <Sidebar />
        <Profile id={userData.id}/>
      </div>
    </div>

  );
}

export default ProfilePage;
