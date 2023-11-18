import Sidebar from "../components/SideBar";
import Searchbar from "../components/SearchBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Arena() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [inProgress, setInProgress] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://" + process.env.REACT_APP_URL + ":1117/user");

        if (userResponse.data.Status === "Success") {
          setUserData(userResponse.data.userData);

          const inProgressResponse = await axios.get(
            `http://` +
            process.env.REACT_APP_URL +
            `:1117/inProgress/filter?q=${userResponse.data.userData.id}`
          );

          if (inProgressResponse.data) {
            setInProgress(inProgressResponse.data);
            if (inProgressResponse.data.length > 0) {
              for (let i = 0; i < Math.min(inProgressResponse.data.length, 3); i++) {
                fetchNames(inProgressResponse.data[i].id);
              }
            }
           
           
          } else {
            console.error("err");
          }

          fetchPotentialOpponents();
        } else {
          // handle error if needed
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchNames = (id) => {
    axios
    .get(
      `http://` +
        process.env.REACT_APP_URL +
        `:1117/user/filter?q=${id}`
    )
    .then((res)=>{
      if(res.data){
        console.log(res.data[0].username)
        setUsers((prevUsers) => [...prevUsers, res.data[0].username]);   
         }
    })
    .catch((err) => console.log("error", err));
  }

  const fetchPotentialOpponents = () => {
    axios
      .get(
        `http://` +
          process.env.REACT_APP_URL +
          `:1117/api/filter?q=${userData.lvl}&field=lvl`
      )
      .then((res) => {
        if (res.data) {
          
          const usernames = res.data.map((user) => user.username);
          const ids = res.data.map((user) => user.id);
          const randomUsernames = getRandomItems(usernames, 5);
          setItems(randomUsernames);
          const randomIds = getRandomItems(ids, 5);

          const opponentsData = randomUsernames.map((username, index) => {
            return {
              username,
              id: randomIds[index],
            };
          });

          setItems(opponentsData);
        } else {
          console.error("err");
        }
      })
      .catch((err) => console.log("error", err));
  };

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // const sendToBattle = (item) => {
  //   console.log(userData.id, item);
  //   axios.post(`http://` + process.env.REACT_APP_URL + `:1117/Battle`, {
  //     userF: userData.id,
  //     userS: item,
  //   });
  //   navigate(`/Battle/${item}`);
  // };
  const sendToBattle = async (item) => {
    console.log(userData.id, item);
  
    // Use Promise.all to wait for all fetchNames calls to complete
    await Promise.all(
      inProgress.map((progressItem) => fetchNames(progressItem.id))
    );
  
    axios.post(`http://` + process.env.REACT_APP_URL + `:1117/Battle`, {
      userF: userData.id,
      userS: item,
    });
    navigate(`/Battle/${item}`);
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
                        <p>L V L {userData.lvl}</p>
                      </div>
                    </div>

                    <button
                      className="bg-yellow-300 text-center font-bold rounded-full ml-3 mr-4 w-25 mt-10"
                      onClick={() => sendToBattle(item.id)}
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

              <div className="bg-red-500 flex-1 rounded-full flex mt-5 p-3">
                <p className="text-white flex-1 w-2/3 font-bold text-xl m-3">
                  {" "}
                  You vs {users.length > 0 ? users[0] : "No in-progress battles"}
                </p>
              </div>
              <div className="bg-black flex-1 rounded-full mt-5 p-3">
                <p className="text-red-500 font-bold text-xl m-3">
                  {" "}
                  You vs  {users.length > 1 ? users[1] : "No in-progress battles"}

                </p>
              </div>
              <div className="bg-white flex-1 rounded-full mt-5 p-3">
                <p className="text-black font-bold text-xl m-3">
                  {" "}
                  You vs {users.length > 2 ? users[2] : "No in-progress battles"}
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
