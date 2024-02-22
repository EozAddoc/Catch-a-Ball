import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie";
import { getBattle, endBattle } from "../api/battle";
import { levelUp } from "../api/user";

function Battle() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { userId, time: initialTime } = useParams();
  const [time, setTime] = useState(0);
  const [myId, setMyId] = useState("");
  const [notification, setNotification] = useState("");
  const [battleData, setBattleData] = useState({});
  const navigate = useNavigate();

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
    console.log(battleData)
  };
  useEffect(() => {
    const token = jsCookie.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("token ", decodedToken.userId)
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

  //For testing purposes so we dont have to wait an hour 
  const finishBattle = async () => {
    console.log("Finish battle button clicked!");
    const test = await getBattleInfo(initialTime)
    if (test) {
      console.log(test)
      await endBattle(test.id);
      console.log("winner " + test.winner)
      winOrLose(test.winner)
      await levelUp(test.winner)
    };
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
    <div className="bg-blue-700">
      <div className="h-full bg-routeN bg-cover">
        <div className="flex flex-col gap-x-5 lg:flex-row p-3 justify-center items-center">
          <h1 className="text-yellow-300 text-yellow-300 text-xl">
            Time remaining: {formatTime(time)}
          </h1>
          <button
            onClick={finishBattle}
            className="bg-yellow-500 p-2 rounded-md"
          >
            Finish Battle
          </button>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row items-center justify-center">
          <div className="order-1 heart gap-2 h-1/5 m-3 flex items-center">
            <Hearts numberOfHearts={3} grayHearts={true} />
            <Hearts numberOfHearts={2} grayHearts={false} />
          </div>
          <div className="order-2 w-4/5 md:w-3/6 lg:w-1/5 mb-3 flex flex-col items-center">
            <ProfileCard id={myId} />
            {!isMobile && <div
              className="bg-blue-500 mt-8 w-4/5 h-6"
              style={{ borderRadius: "50%" }}
            />}
          </div>
          <div className="order-3 text-white text-xl font-semibold">
            VS.
          </div>
          <div className="order-5 lg:order-last gap-2 h-1/5 m-3 flex items-center">
            <Hearts numberOfHearts={2} grayHearts={true} />
            <Hearts numberOfHearts={3} grayHearts={false} />
          </div>
          <div className="order-6 lg:order-4 w-4/5 md:w-3/6 lg:w-1/5 mb-3 flex flex-col items-center">
            <ProfileCard id={userId} />
            {!isMobile && <div
              className="bg-blue-500 mt-8 w-4/5 h-6"
              style={{ borderRadius: "50%" }}
            />}
          </div>
        </div>
      </div>
      <Sidebar notification={notification} />
    </div>
  );
}

export default Battle;
