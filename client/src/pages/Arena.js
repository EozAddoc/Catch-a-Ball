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
    // Set the token in headers
    setAuthToken(storedToken);

    // Verify the token on the server (optional)
    axios.get('/verify-token')
      .then(response => {
        console.log("verified")
        // Token is valid, user is authenticated
        // Set user state or perform other actions
      })
      .catch(error => {
        console.log("error token" )
        // Token is invalid or expired
        // Redirect to login or perform other actions
      });
  }
    const res = getUser();
    setUserData(res);
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
    
    console.log("user lvl" + userData.battleLvl)
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
    navigate(`/Battle/${userId}/${time}`);;
  };

  const InProgressBattle = ({ bgColor, textColor, number }) => {
    return (
      <div
        className={`${bgColor} text-center flex-1 rounded-full flex mt-5 p-3`}
        onClick={() => sendToOngoingBattle(usersId[number], time[number])}
      >
        <p className={`${textColor} flex-1 w-2/3 font-bold text-xl m-3`}>
          {usersName.length > 0 ? "You vs " + usersName[number] : "No in-progress battles"}
        </p>
      </div>
    )
  };

  return (
    <div className="h-full w-full lg:h-screen bg-townYN bg-cover flex flex-col items-center justify-center">
      <div className="search w-1/2 mb-8 fixed top-20 mr-5">
        <Searchbar />
      </div>
      <div className="flex justify-center items-center flex-col lg:flex-row h-fit mt-[50%] md:mt-[20%] lg:mt-[5%] w-4/5">
        <div className="flex-1">
          <div className="bg-gray-200 w-fit h-fit flex pb-5 flex-col">
            <div className="bg-red-500 h-full w-fit flex-1">
              <h1 className="font-bold text-white text-center m-3">
                R&nbsp;E&nbsp;C&nbsp;O&nbsp;M&nbsp;M&nbsp;E&nbsp;N&nbsp;D&nbsp;E&nbsp;D  O&nbsp;P&nbsp;P&nbsp;O&nbsp;N&nbsp;E&nbsp;N&nbsp;T&nbsp;S
              </h1>
            </div>
            <div className="">
              {items.map((item, index) => (
                <div key={index} className="flex w-full">
                  <div className="rounded-full relative p-2 mt-10 w-full h-14 flex">
                    <div className="flex-1">
                      <div className="bg-white ml-4 rounded-full w-12 h-12"></div>
                    </div>
                    <div className="flex-1 mt-3 text-center">
                      <p className="font-bold">{item.username}</p>
                    </div>
                    <div className="flex-1 font-bold mt-3 w-1/6 text-center">
                      <p>L&nbsp;V&nbsp;L  {userData.lvl}</p>
                    </div>
                  </div>

                  <button
                    className="bg-yellow-300 text-center font-bold rounded-full ml-3 mr-4 w-fit mt-10"
                    onClick={() => sendToBattle(item.id, item.time)}
                  >
                    <p className="mt-3 px-2">B&nbsp;A&nbsp;T&nbsp;T&nbsp;L&nbsp;E</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col mx-5 px-5 m-10">
            <h2 className="text-center font-bold text-white mb-10">
              I&nbsp;N &nbsp; P&nbsp;R&nbsp;O&nbsp;G&nbsp;R&nbsp;E&nbsp;S&nbsp;S&nbsp;:
            </h2>
            <InProgressBattle bgColor={"bg-red-500"} number={0} textColor={"text-white"} />
            <InProgressBattle bgColor={"bg-black"} number={1} textColor={"text-red-500"} />
            <InProgressBattle bgColor={"bg-white"} number={2} textColor={"text-black"} />
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Arena;
