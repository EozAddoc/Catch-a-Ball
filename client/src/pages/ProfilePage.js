import Profile from "../components/EditProfile";
import Sidebar from "../components/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import withDarkMode from "../components/withDarkMode";

function ProfilePage({ darkMode, toggleTheme }) {
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
      <div className="h-screen dark:bg-profileN bg-profile bg-cover w-screen flex items-center justify-center">
      <div className="flex flex-col h-full">
          <div className="absolute top-0 right-0">
            <button
              className="toggle-button ml-2 p-4 h-20"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
          <Sidebar />
        </div>
        <Profile id={userData.id}/>
      </div>
    </div>

  );
}

export default withDarkMode(ProfilePage);
