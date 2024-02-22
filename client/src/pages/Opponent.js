import React, { useState, useEffect } from "react";
import Sidebar from '../components/SideBar'
import ProfileCard from '../components/ProfileCard';
import { getOtherUsersData } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie"
import axios from "axios";

function Opponent() {
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
  // Now 'decoded' contains the decoded JWT payload

  const Battle = (userId) => {
    console.log(typeof myId, typeof userId); // Log the types of myId and userId
    console.log(myId, userId)
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


  getOtherUsersData(userId)
    .then((res) => {
      if (res.data) {
        setOpponentName(res.data[0].username);
      }
    })
    .catch((err) => console.log("error", err));

  return (
    <div className="bg-townN bg-cover h-full gap-10 flex flex-col items-center justify-center">
      <h1 className='text-yellow-500 italic font-light uppercase m-6'> Face {opponentName.length > 0 && opponentName}</h1>
      <div className='h-5/6 w-full flex-col lg:flex-row flex justify-center items-center'>
        <div className='flex-1 flex justify-center items-center'>
          <div className='h-2/3 w-5/5 lg:w-2/5'>
            <ProfileCard id={myId} />
            <div className='bg-red-500 p-3 m-10 rounded-full h-1/6 text-center font-bold'><button onClick={() => Battle(userId)}><h2>Battle</h2></button></div>
          </div>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='h-2/3 w-5/5 lg:w-2/5'>
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
