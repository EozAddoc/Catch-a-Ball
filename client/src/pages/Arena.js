import Sidebar from "../components/SideBar";
import Searchbar from "../components/SearchBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getOtherUsersData,
  getInProgressData,
  getPotentialOpponents,
} from "../api/user";
import axios from "axios";


function Arena() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [inProgress, setInProgress] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const [items, setItems] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [time, setTime] = useState([]);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    };
  if (storedToken) {
    setAuthToken(storedToken);

    axios.get('/verify-token')
      .then(response => {
        console.log("verified")
      })
      .catch(error => {
        console.log("error token" )
      });
  }
    const res =getUser();
    setUserData(res)
    fetchData();
    fetchPotentialOpponents();
  }, []);
  const fetchData = async () => {
    try {
      const userResponse = await getUser();

      if (userResponse.data.Status === "Success") {
        setUserData(userResponse.data.userData);

        const inProgressResponse = await getInProgressData(
          userResponse.data.userData.id
        );
        const myId = userResponse.data.userData.id;
        if (inProgressResponse.data) {
          setInProgress(inProgressResponse.data);
          if (inProgressResponse.data.length > 0) {
            for (
              let i = 0;
              i < Math.min(inProgressResponse.data.length, 3);
              i++
            ) {
              if (myId !== inProgressResponse.data[i].userIdS) {
                fetchNames(inProgressResponse.data[i].userIdS);
              } else {
                fetchNames(inProgressResponse.data[i].userIdF);
              }

              setTime((prevUsers) => [
                ...prevUsers,
                inProgressResponse.data[0].time,
              ]);
            }
          }
        } else {
          console.error("err");
        }

      } else {
        // handle error if needed
      }
    } catch (err) {
      console.log("error", err);
    }
  };


  const fetchNames = (id) => {
    getOtherUsersData(id)
      .then((res) => {
        if (res.data) {
          setUsersName((prevUsers) => [...prevUsers, res.data[0].username]);
          setUsersId((prevUsers) => [...prevUsers, res.data[0].id]);
        }
      })
      .catch((err) => console.log("error", err));
  };


  const fetchPotentialOpponents =  async () => {
    const userResponse = await getUser();

    if (userResponse.data.Status === "Success") {
      const lvl = userResponse.data.userData.battleLvl
    
    await getPotentialOpponents(lvl)
      .then((res) => {
        console.log(res)
        if (res) {
          console.log(res)
          const opponentData = res.slice(0, 5).map((user) => {
            return {
              id: user.id,
              username: user.username,
            };
          });
          setItems(opponentData);
        } else {
          console.error("err");
        }
      })
      .catch((err) => console.log("error", err));
    }
  };

  const sendToBattle = (item) => {
    const time = new Date().toISOString();
    axios.post(process.env.REACT_APP_URL + `/Battle`, {
      userF: userData.id,
      userS: item,
    });

    navigate(`/Battle/${item}/${time}`);
  };
  const sendToOngoingBattle = (userId, time) => {
    navigate(`/Battle/${userId}/${time}`);
  };

  return (
    <div className="min-h-screen bg-blue-700">
      <div className="min-h-screen min-w-screen bg-townYN bg-cover h-screen flex flex-col items-center justify-center">
        <div className="search w-1/2 mb-8 fixed top-20">
          <Searchbar />
        </div>
        <div className="flex h-3/4 mt-32 w-full">
          <div className="flex-1">
            <div className="bg-pink-200 w-2/3 h-5/6 flex mt-12 ml-24 flex-col">
              <div className="bg-red-500 h-1/6 flex-1">
                <h1 className="font-bold text-white text-center m-3">
                  {" "}
                  Recommended Opponents
                </h1>
              </div>
              <div className="bg-gray-200 h-5/6">
                {" "}
                {items.map((item, index) => (
                  <div key={index} className="flex w-full">
                    <div className="rounded-full relative p-2 mt-10 w-full h-14 flex">
                      <div className="flex-1">
                        <div className="bg-white ml-4 rounded-full w-12 h-12"></div>
                      </div>
                      <div className="flex-1 mt-3">
                        {" "}
                        <p className="font-bold ">{item.username}</p>
                      </div>
                      <div className="flex-1 font-bold mt-3 w-1/6">
                        <p>L V L {userData.battleLvl}</p>
                      </div>
                    </div>

                    <button
                      className="bg-yellow-300 text-center font-bold rounded-full ml-3 mr-4 w-25 mt-10"
                      onClick={() => sendToBattle(item.id, item.time)}
                    >
                      {" "}
                      <p className="mt-3">B A T T L E</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 mt-10">
            <div className="flex flex-col mx-5 px-5 m-10">
              <h2 className="text-center font-bold text-white mb-10">
                I N &nbsp; P R O G R E S S :
              </h2>

              <div
                className="bg-red-500 flex-1 rounded-full flex mt-5 p-3"
                onClick={() => sendToOngoingBattle(usersId[0], time[0])}
              >
                <p className="text-white flex-1 w-2/3 font-bold text-xl m-3">
                  {" "}
                  You vs{" "}
                  {usersName.length > 0
                    ? usersName[0]
                    : "No in-progress battles"}
                </p>
              </div>
              <div
                className="bg-black flex-1 rounded-full mt-5 p-3"
                onClick={() => sendToOngoingBattle(usersId[1], time[1])}
              >
                <p className="text-red-500 font-bold text-xl m-3">
                  {" "}
                  You vs{" "}
                  {usersName.length > 1
                    ? usersName[1]
                    : "No in-progress battles"}
                </p>
              </div>
              <div
                className="bg-white flex-1 rounded-full mt-5 p-3"
                onClick={() => {
                  sendToOngoingBattle(usersId[2], time[2]);
                }}
              >
                <p className="text-black font-bold text-xl m-3">
                  {" "}
                  You vs{" "}
                  {usersName.length > 2
                    ? usersName[2]
                    : "No in-progress battles"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}

export default Arena;
