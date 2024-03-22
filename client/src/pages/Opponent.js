import React, { useState, useEffect } from "react";
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard';
import { getOtherUsersData } from "../api/user";
import { useNavigate,  useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie"
import axios from "axios";
import withDarkMode from "../components/withDarkMode";

function Opponent({ darkMode, toggleTheme }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [myId, setMyId] = useState('');
  const [opponentName, setOpponentName] = useState("");

  useEffect(() => {
    const token = jsCookie.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setMyId(decodedToken.userId)
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);


  const Battle = (userId) => {
    if (myId === parseInt(userId)) {
      alert("You cannot battle yourself!");
      return;
    }
    const time = new Date().toISOString();
    axios.post(process.env.REACT_APP_URL + `/Battle`, {
      userF: myId,
      userS: userId,
    });
    navigate(`/Battle/${userId}/${time}`)
  }


  getOtherUsersData("id",userId)
    .then((res) => {
      if (res.data) {
        setOpponentName(res.data[0].username);
      }
    })
    .catch((err) => console.error("error", err));

  return (
      <div className="dark:bg-townN bg-town bg-cover h-full flex flex-col items-center justify-center">
         <div className="absolute top-0 right-0">
            <button
              className="toggle-button ml-2 p-4 h-20"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
      <h1 className='text-yellow-500 italic font-light uppercase m-6'> Face {opponentName.length > 0 && opponentName}</h1>
        <div className='h-3/6 md:h-full w-full items-start flex-col md:flex-row flex'>
          <div className='flex justify-center items-center sm:ml-10 ml-0'>
            <div className='h-2/4 w-4/5 md:h-2/4 lg:h-1/4 lg:w-2/4'>
              <ProfileCard id={myId}/>
              <div className='bg-red-500 sm:p-3 sm:m-10 p-1 m-2 rounded-full sm:h-1/6 h-1/4 text-center font-bold'><button onClick={() => Battle(userId)}><h1>Battle</h1></button></div>

            </div>
          </div>
          <div className='flex justify-center items-center sm:mr-10 mr-0 '>
            <div className='h-2/4 w-4/5 md:h-2/4 lg:h-1/4 lg:w-2/4 mr-0'>
              <ProfileCard id={userId} />
              <div className='bg-yellow-500 sm:p-3 sm:m-10 p-1 m-2 rounded-full sm:h-1/6 h-1/4 text-center font-bold'><h1>Chat</h1></div>
            </div>
          </div>

        </div>

        <Sidebar />
      </div>
  );
}

export default withDarkMode(Opponent);
