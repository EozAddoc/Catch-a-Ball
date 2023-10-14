import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "./ProfileCard";

function ProfilePage() {
  const navigate = useNavigate();
  const [mess, setMess] = useState("");
  const [userData, setUserData] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  const updateUser = () => {
    // Make an API call to update the user information
    axios
      .put("http://" + process.env.REACT_APP_URL + ":1117/Profile", updatedUser)
      .then((res) => {
        if (res.data.Status === "Success") {
          // Optionally handle success, for example, show a success message
          console.log("User updated successfully!");
        } else {
          // Handle error, for example, set an error message
          setMess(res.data.err);
        }
      })
      .catch((err) => console.log("error", err));
  };

  const handleInputChange = (e) => {
    // Update the updatedUser state based on user input
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("http://" + process.env.REACT_APP_URL + ":1117/user")
      .then((res) => {
        if (res.data.Status === "Success") {
          setUserData(res.data.userData);
        } else {
          setMess(res.data.err);
        }
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleEditModeChange = (newEditMode) => {
    setIsEditMode(newEditMode);
  };

  return  (
    

    <div  className={!isEditMode ? "shadow-md w-1/3 h-5/6" : `bg-gray-300 rounded-lg  flex flex-col sm:flex-row relative mx-auto sm:h-5/6 w-11/12 sm:w-8/12 `}>
               {!isEditMode && <ProfileCard />}

          {!isEditMode && (
      <button className="bg-gradient-to-t from-yellow-600 via-yellow-200 to-yellow-600 text-center w-full h-7 text-l font-bold m-2 italic rounded-full " onClick={() => {
        setIsEditMode(!isEditMode);
      }}>
        Edit Profile
      </button>
    )}    
        


    {isEditMode && (


    <div className={`bg-transparent rounded-lg shadow-md flex flex-col sm:flex-row relative `}>
           <div className=" w-full h-full md:w-1/3 sm:w-1/5 flex flex-col items-center justify-center">
      <ProfileCard />
    </div>
       
      <div className="bg-gray-300  flex-1 flex flex-col relative">
     
        <div className="h-1/5 p-2">
          <h2 className="mt-8 sm:mt-2 center justify-center">
            Edit your profile :
          </h2>
        </div>
    
        <div className="h-4/5 p-2 sm:p-1">
        <div className="h-1/10 flex justify-end items-start">
          <img
            src="edit.png"
            alt="Edit"
            className="cursor-pointer w-6 h-6"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          />
        </div>
        <div className="m-3 sm:m-2 h-1/5 flex items-center">
        
            <div className="w-full">
              <label
                htmlFor="username"
                className="p-2 block text-3xl sm:text-xl md:text-2xl font-medium text-gray-700"
              >
                Username:
              </label>
            
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleInputChange}
                  placeholder={userData.username}
                  className="w-full px-2 py-2 text-xl text-gray-700 bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-red-500"
                />
          
            </div>
          </div>


          <div className="m-3 h-1/5 flex items-center">
            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="p-2 block font-medium text-3xl sm:text-base md:text-2xl text-gray-700"
              >
                Email:
              </label>
           
                <input
                  type="text"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  placeholder={userData.email}
                  className="w-full px-2 py-2 text-xl text-gray-700 bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-red-500"
                />
         
            </div>
          </div>

          <div className="m-3 h-1/5 flex items-center">
            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="p-2 block font-medium text-3xl sm:text-lg md:text-2xl text-gray-700"
              >
                Password:
              </label>
             
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleInputChange}
                  placeholder={userData.password}
                  className="w-full px-2 py-2 text-xl text-gray-700 bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-red-500"
                />
           
            </div>
          </div>

          <div className="m-3 h-1/5 flex items-center">
            {/* Intro */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="p-2 block font-medium text-3xl sm:text-lg md:text-2xl text-gray-700"
              >
                Introduction:
              </label>
                <input
                  type="text"
                  name="introduction"
                  value={updatedUser.password}
                  onChange={handleInputChange}
                  placeholder={userData.password}
                  className="w-full px-2 py-2 text-xl text-gray-700 bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-red-500"
                />
           
            </div>
          </div>
          
          
            <div className="absolute m-4 bottom-4 right-0 sm:bottom-8 sm:right-0">
              <button
                onClick={updateUser}
                className="bg-blue-500 text-white px-4 py-2 sm:px-4 rounded-full"
              >
                Save Changes
              </button>
            </div>
          
        </div>
      </div> 
        
     </div>
      )}
     </div>
         
  );
}

export default ProfilePage;
