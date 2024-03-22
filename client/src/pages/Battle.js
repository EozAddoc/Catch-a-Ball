import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie";
import { getBattle, endBattle } from "../api/battle";
import { levelUp } from "../api/user";
import { getOtherUsersData, updateNotifications } from "../api/user";
import withDarkMode from "../components/withDarkMode";

function Battle({ darkMode, toggleTheme }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { userId, time: initialTime } = useParams();
  const [time, setTime] = useState(0);
  const [myId, setMyId] = useState("");
  const [winner, setWinner] = useState(1);
  const [loser, setLoser] = useState(2);
  const [heartsList, setHeartsList] = useState([]);
  const [heartsListUser1, setHeartsListUser1] = useState([]);
  const [heartsListUser2, setHeartsListUser2] = useState([]);
  const [battleData, setBattleData] = useState({});
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // check if window is resized
  useEffect(() => {
    setHeartsList(initHearts);
    setHeartsListUser1(initHearts);
    setHeartsListUser2(initHearts);
    window.addEventListener(
      "resize",
      () => {
        const tempIsMobile = window.innerWidth < 1200;
        if (tempIsMobile !== isMobile) setIsMobile(tempIsMobile);
      },
      false
    );
  }, [isMobile]);

  //Battle winner function
  const getBattleInfo = async (initialTime) => {
    const newTime = formatSQLTime(initialTime);
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
        const res = await getOtherUsersData("id", userId);
        const test = await getBattleInfo(initialTime);
        if (test) {
          setWinner(test.winner);
        }
        if (res && res.data) {
          const name = res.data[0].username;
          setUserName(name);
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
        setMyId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);

  const formatSQLTime = (time) => {
    const dateObject = new Date(time);
    const formattedTime = dateObject
      .toISOString()
      .slice(0, 19)
      .replace("T", "%20");
    return formattedTime;
  };

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
      finishBattle();
    }
    setTime(remainingTime > 0 ? remainingTime : 0);
  };
  const getRandomCardId = async (battleId) => {
    const pageSize = 1; // Fetch only one card
    const page = Math.ceil(Math.random() * 100); // Random page number (assuming 100 pages exist)

    // Construct the URL with query parameters
    const url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        endBattle(battleId, data.data[0].id, winner);
      } else {
        throw new Error("No cards found.");
      }
    } catch (error) {
      console.error("Error fetching random card:", error);
      return null;
    }
  };

  const finishBattle = async () => {
    try {
      const test = await getBattleInfo(initialTime);
      if (test) {
        await getRandomCardId(test.id);
        winOrLose(test.winner);
      }
    } catch (error) {
      return null;
    }
  };

  const winOrLose = (winner) => {
    try {
      if (myId === winner) {
        updateNotifications({
          id: myId,
          notifications: `You won the battle against ${userName}`,
        });
      } else {
        updateNotifications({
          id: myId,
          notifications: `You lost the battle against ${userName}`,
        });
      }
      navigate("/home");
    } catch (error) {
      console.error("Error determining winner/loser:", error);
    }
  };
  useEffect(() => {
    calculateDiff(initialTime);

    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Remove a red heart and add a grey heart
      const updatedHeartsList = heartsList.map((heart, index) => {
        if (index === 0) {
          return process.env.PUBLIC_URL + "/heartG.png";
        } else if (index === 4) {
          return process.env.PUBLIC_URL + "/Rheart.png";
        } else {
          return heartsList[index - 1];
        }
      });

      setHeartsList(updatedHeartsList);
    }, 10000); // 600000 milliseconds = 10 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [heartsList, loser]);

  const hearts = [
    ...Array(4).fill(process.env.PUBLIC_URL + "/Rheart.png"), // Four red hearts
    process.env.PUBLIC_URL + "/heartG.png", // One grey heart
  ];
  const initHearts = [
    ...Array(5).fill(process.env.PUBLIC_URL + "/Rheart.png"), // One grey heart
  ];

  return (
    <div className="dark:bg-arenaN bg-arena bg-cover h-screen flex flex-col items-center justify-center">
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
          <div className="absolute bottom-28 md:left-10 left-20 lg:left-20 sm:left-42 sm:bottom-28 w-3/4 md:w-2/5 h-1/3 sm:h-2/3 sm:w-2/4 lg:w-1/4">
            <ProfileCard id={myId} />
          </div>
          <div className="hidden lg:flex heart w-1/3 h-1/5 absolute bottom-16 left-1/3">
            {heartsList.map((heart, index) => (
              <img
                key={`heart_${index}`}
                src={heart}
                alt={index === 4 ? "greyheart" : "redheart"} // Set alt text accordingly
                className="h-1/2 m-3"
              />
            ))}
          </div>
          <div
            className="hidden lg:flex absolute bottom-10 left-20 bg-blue-500"
            style={{ height: "38px", width: "500px", borderRadius: "50%" }}
          ></div>
        </div>
        <div>
          <div className="absolute top-20 right-10 sm:right-58 sm:bottom-80 h-1/3 w-3/4 sm:h-2/3 sm:w-2/5 lg:w-1/4">
            <ProfileCard id={userId} />
          </div>
          <div className="hidden lg:flex heart w-1/3 h-1/6 absolute bottom-80 right-96">
            {initHearts.map((heart, index) => (
              <img
                key={`heart_${index}`}
                src={heart}
                alt={index === 4 ? "greyheart" : "redheart"} // Set alt text accordingly
                className="h-1/3 m-3"
              />
            ))}
          </div>
          <div
            className="hidden lg:flex absolute bottom-[13rem] right-[4rem] bg-blue-500"
            style={{ height: "15px", width: "400px", borderRadius: "50%" }}
          ></div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default withDarkMode(Battle);
