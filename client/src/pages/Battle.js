import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie";
import { getBattle, endBattle } from "../api/battle";
import { levelUp } from "../api/user";
import { getOtherUsersData, updateNotifications } from "../api/user";

function Battle() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { userId, time: initialTime } = useParams();
  const [time, setTime] = useState(0);
  const [myId, setMyId] = useState("");
  const [battleData, setBattleData] = useState({});
  const navigate = useNavigate();
  const [userName, setUserName] = useState("")

  // check if window is resized
  useEffect(() => {
    window.addEventListener("resize", () => {
      const tempIsMobile = window.innerWidth < 1200;
      if (tempIsMobile !== isMobile) setIsMobile(tempIsMobile);
    }, false);
  }, [isMobile]);

  //Battle winner function
  const getBattleInfo = async (initialTime) => {
    const newTime = formatSQLTime(initialTime)
    try {
      const res = await getBattle(newTime);
      if (res) {
        setBattleData(res);
        return res;
      }
    } catch (error) {
      console.error("Error fetching battle data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOtherUsersData(userId);
        if (res && res.data) {
          console.log("Other user data:", res.data[0]);
          const name = res.data[0].username;
          console.log(name)
          setUserName(name)
        }
      } catch (error) {
        console.error("Error fetching other user data:", error);
      }
    };

    fetchData();
  }, [userId]);

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

  }, [])

  const formatSQLTime = (time) => {
    const dateObject = new Date(time);
    const formattedTime = dateObject.toISOString().slice(0, 19).replace('T', '%20');
    return formattedTime;
  }


  //just formating time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };


  // function that handles time and workflow when time is 0
  const calculateDiff = (time) => {
    const dateString = time;
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const diff = Math.floor((currentDate - targetDate) / 1000);
    const remainingTime = 3600 - diff;
    if (remainingTime <= 0) {
      finishBattle()
    }
    setTime(remainingTime > 0 ? remainingTime : 0);
  };


  const finishBattle = async () => {
    try {
      const test = await getBattleInfo(initialTime);
      if (test) {
        await endBattle(test.id);
        winOrLose(test.winner);
        await levelUp(test.winner);
      }
    } catch (error) {
      console.error('Error finishing battle:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const winOrLose = (winner) => {
    try {
      if (myId === winner) {
        updateNotifications({ myId, notifications: `You won the battle against ${userName}` });

      } else {
        updateNotifications({ myId, notifications: `You lost the battle against ${userName}` });

      }
      navigate("/home");
    } catch (error) {
      console.error("Error determining winner/loser:", error);
    }
    const winOrLose = (winner) => {
      console.log("in win or lose")
      try {
        if (myId === winner) {
          //  setNotification(`You won the battle against ${userId}`);
        } else {
          // setNotification(`You lost the battle against ${userId}`);
        }
        navigate("/home");
      } catch (error) {
        console.error("Error determining winner/loser:", error);
      }
    };
  }
  useEffect(() => {

    // Calculate the time difference and update the time state

    calculateDiff(initialTime);

    // Update the time every second
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [initialTime]);

  const Hearts = ({ numberOfHearts, grayHearts }) => {
    let heartsList = [];
    let heartColor;
    grayHearts ? heartColor = "/heartG.png" : heartColor = "/Rheart.png";
    for (let i = 0; i < numberOfHearts; i++) {
      heartsList.push(
        <img
          src={process.env.PUBLIC_URL + heartColor}
          alt={grayHearts ? "gray heart" : "red heart"}
          className="h-10"
        />
      );
    };
    return heartsList;
  }

  return (
      <div className="bg-routeN bg-cover h-screen flex flex-col items-center justify-center">
        <div>
          <div className=" ">
            <div>
            <button
              onClick={finishBattle}
              className="absolute bottom-10 right-10 bg-yellow-500 p-2 rounded-md"
            >
              Finish Battle
            </button>
              <h1 className="text-yellow-300 absolute top-4 right-4 text-yellow-300 sm:top-8 sm:right-8 md:text-lg lg:text-xl">
                {" "}
                Time remaining :{formatTime(time)}
              </h1>
            </div>
            <div className="absolute bottom-28 left-5 sm:left-52 sm:bottom-28  w-1/2 h-1/3 sm:h-2/3 sm:w-1/4 ">
              <ProfileCard id={myId} />
            </div>
            <div className="hidden lg:flex heart w-1/3 h-1/5 absolute bottom-16 left-1/2  ">
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                className="h-1/2 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                alt="greyheart"
                className="h-1/2 m-3 "
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                alt="greyheart"
                className="h-1/2 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/Rheart.png"}
                alt="greyheart"
                className="h-1/2 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/Rheart.png"}
                alt="greyheart"
                className="h-1/2 m-3"
              ></img>
            </div>
            <div
              className="hidden lg:flex  absolute bottom-10   left-20 bg-blue-500"
              style={{ height: "38px", width: "750px", borderRadius: "50%" }}
            ></div>
          </div>
          <div>
            <div className="absolute top-20 right-10 sm:right-48 sm:bottom-80 h-1/3 w-1/2 sm:h-1/2 sm:w-1/5  ">/
              <ProfileCard id={userId} />
            </div>
            <div className="hidden lg:flex   heart  w-1/3 h-1/6 absolute bottom-80 right-96   ">
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                alt="greyheart1"
                className="h-1/3 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                alt="greyheart2"
                className="h-1/3 m-3 "
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/Rheart.png"}
                alt="greyheart3"
                className="h-1/3 m-3 "
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/Rheart.png"}
                alt="redHeart"
                className="h-1/3 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/Rheart.png"}
                alt="redHeart"
                className="h-1/3 m-3"
              ></img>
            </div>
            <div
              className="hidden lg:flex absolute bottom-72 right-36 bg-blue-500"
              style={{ height: "15px", width: "400px", borderRadius: "50%" }}
            ></div>
          </div>
        </div>
      <Sidebar/>
    </div>
  );
}

export default Battle;

