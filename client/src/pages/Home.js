import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pokemon from "pokemontcgsdk";
import LoadingPage from "../LoadingPage";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/SideBar";
import Menu from "../components/HomepageCardMenu/Menu";
import MissionsHomepage from "../components/MissionsHomepage";

function Home() {
  const navigate = useNavigate();
  
  const [auth, setAuth] = useState(false);
  const [mess, setMess] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState("");
  const [deckData, setDeckData] = useState([]);
  const [deckInfo, setDeckInfo] = useState([]);
  const [menuSelected, setMenuSelected] = useState("team");

  axios.defaults.withCredentials = true;

  async function ApiCall(id) {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const card = await pokemon.card.find(id);
    return card;
  }

  const setCardSelected = (menu) => {
    setMenuSelected(menu);
  };

  const [loadingApiCall, setLoadingApiCall] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(process.env.REACT_APP_URL + "/user");
        const deckResponse = await axios.get(process.env.REACT_APP_URL + "/deck");

        if (userResponse.data.Status === "Success") {
          setAuth(true);
          setUserData(userResponse.data.userData);
        } else {
          setAuth(false);
          setMess(userResponse.data.err);
        }

        if (deckResponse.data.Status === "Success") {
          setDeckData(deckResponse.data.deckData);
        } else {
          setMess(deckResponse.data.err);
        }

        setTimeout(() => {
          setLoadingApiCall(false);
        }, 4000);   
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loadingApiCall) {
      deckData.forEach(async (deckItem) => {
        const data = await ApiCall(deckItem.card_api);
        setDeckInfo((value) => [...value, data]);
        setAvatar(await ApiCall(userData.avatar_api));
      });
    }
  }, [deckData, userData, loadingApiCall]);

  switch (menuSelected) {
    case "team":
      return (
        <div className="bg-gray-700">
          {auth ? (
            <div class="min-h-screen min-w-screen bg-homeN bg-cover opacity-100">
              {loadingApiCall ? (
                <LoadingPage />
              ) : (
                <>
                  <div className="search w-full ml-10 top-24 p-5 flex justify-center items-center ">
                    <div className="w-3/5">
                      <SearchBar />
                    </div>
                  </div>
                  <div className="text-center min-h-screen px-5 py-5">
                    <div className="flex"></div>
                    <div class="grid grid-cols-2">
                      <div className="ml-24 grid grid-cols-2 md:grid-cols-3 place-items-center">
                        {deckInfo.length > 0 &&
                          deckInfo.map((card) => {
                            return (
                              <img
                                className="hover:scale-150 transition w-36 p-2 md:w-64"
                                src={card.images?.large}
                                alt={card.name}
                              />
                            );
                          })}
                      </div>
                      <Menu setMenuSelected={setCardSelected} />
                    </div>
                    <Sidebar />
                  </div>
                </>
              )}
            </div>
          ) : (
            navigate("/")
          )}
        </div>
      );

    case "trainer":
      return (
        <div className="bg-gray-700">
          {auth ? (
            <div class="min-h-screen min-w-screen bg-homeN bg-cover opacity-100">
              <div className="search w-full ml-10 top-24 p-5 flex justify-center items-center ">
                <div className="w-3/5">
                  {" "}
                  <SearchBar />
                </div>
              </div>
              <div className="text-center min-h-screen px-5 py-5">
                <div className="flex"></div>
                <div class="grid grid-cols-2">
                  <Menu setMenuSelected={setCardSelected} />
                </div>
                <Sidebar />
              </div>
            </div>
          ) : (
            navigate("/")
          )}
        </div>
      );

    case "missions":
      return (
        <div className="bg-gray-700">
          {auth ? (
            <div class="min-h-screen min-w-screen bg-homeN bg-cover opacity-100">
              <div className="search w-full ml-10 top-24 p-5 flex justify-center items-center ">
                <div className="w-3/5">
                  {" "}
                  <SearchBar />
                </div>
              </div>
              <div className="text-center min-h-screen px-5 py-5">
                <div className="flex"></div>
                <div class="grid grid-cols-2">
                    <MissionsHomepage />
                  <Menu setMenuSelected={setCardSelected} />
                </div>
                <Sidebar />
              </div>
            </div>
          ) : (
            navigate("/")
          )}
        </div>
      )
      default:
          return (
            <div className="bg-gray-700">
              {auth ? (
                <div class="h-screen w-screen bg-homeN bg-cover opacity-100">
                  {loadingApiCall ? (
                    <LoadingPage />
                  ) : (
                    <>
                      <div className="search w-full ml-10 top-24 p-5 flex justify-center items-center ">
                        <div className="w-3/5 pt-10">
                          <SearchBar />
                        </div>
                      </div>
                      <div className="text-center min-h-screen px-5 py-5">
                        <div className="flex"></div>
                        <div class="grid grid-cols-2">
                          <p>Default content goes here</p>
                          <Menu setMenuSelected={setCardSelected} />
                        </div>
                        <Sidebar />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                navigate("/")
              )}
            </div>
      );
  }
}

export default Home;