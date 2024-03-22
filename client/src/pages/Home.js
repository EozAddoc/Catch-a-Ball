import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pokemon from "pokemontcgsdk";
import LoadingPage from "../LoadingPage";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/SideBar";
import Menu from "../components/HomepageCardMenu/Menu";
import MissionsHomepage from "../components/MissionsHomepage";
import withDarkMode from "../components/withDarkMode";
function Home({darkMode,toggleTheme}) {
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
      try {
        pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
        const card = await pokemon.card.find(id);
        return card;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return null; 
        } else {
          throw error;
        }
      }
  }

  const setCardSelected = (menu) => {
    setMenuSelected(menu);
  };

  const [loadingApiCall, setLoadingApiCall] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          process.env.REACT_APP_URL + "/user"
        );
        const deckResponse = await axios.get(
          process.env.REACT_APP_URL + "/deck"
        );

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
      const fetchData = async () => {
        for (let i = 0; i < 3 && i < deckData.length; i++) {
          const data = await ApiCall(deckData[i].card_api);
          setDeckInfo((value) => [...value, data]);
        }
        const avatar = await ApiCall(userData.avatar_api);
        setAvatar(avatar);
      }
      fetchData()
    }

  }, [deckData, userData, loadingApiCall]);
  

  switch (menuSelected) {
    case "team":
      return (
        <div>
            <div className="h-full md:h-screen w-full overflow-x-hidden dark:bg-homeN bg-home bg-cover pb-[300px]">
              {loadingApiCall ? (
                <LoadingPage />
              ) : (
                <>
                  <div className="search top-24 p-5 flex justify-center items-center">
                  <div className="absolute top-0 right-0">
            <button
              className="toggle-button ml-2 p-4 h-20"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
                    <div className="w-3/5">
                      <SearchBar />
                    </div>
                  </div>
                  <div className="text-center px-5 py-5">
                    <div className="flex md:gap-20 flex-col items-center">
                      <div className="grid grid-cols-2 md:grid-cols-3 place-items-center" data-cy="deck">
                        {deckInfo.length > 0 &&
                          deckInfo.map((card) => {
                            return (
                              <img
                                key={card.id}
                                className="hover:scale-150 z-30 transition w-36 p-2 md:w-64"
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
        </div>
      );

    case "trainer":
      return (
        <div>
        
            <div className="h-screen md:h-screen w-full overflow-x-hidden dark:bg-homeN bg-home bg-cover pb-[300px]">
              <div className="search top-24 p-5 flex justify-center items-center">
                <div className="w-3/5">
                  <SearchBar />
                </div>
              </div>
              <div className="text-center px-5 py-5">
                <div className="flex md:gap-20 flex-col items-center">
                  <img
                    key={avatar?.id}
                    className="hover:scale-150 z-30 transition w-36 md:w-64"
                    src={avatar?.images?.large}
                    alt={avatar?.name}
                  />
                  <Menu setMenuSelected={setCardSelected} />
                </div>
                <Sidebar />
              </div>
            </div>
        </div>
      );

    case "missions":
      return (
        <div>
        
            <div className="h-screen md:h-screen w-full overflow-x-hidden dark:bg-homeN bg-home bg-cover pb-[300px]">
              <div className="search top-24 p-5 flex justify-center items-center">
                <div className="w-3/5">
                  <SearchBar />
                </div>
              </div>
              <div className="text-center px-5 py-5">
                <div className="flex md:gap-20 flex-col items-center">
                  {/* <div className="grid grid-cols-2"> */}
                  <MissionsHomepage />
                  {/* </div> */}
                  <Menu setMenuSelected={setCardSelected} />
                </div>
                <Sidebar />
              </div>
            </div>
        </div>
      );

    default:
      return (
        <div>
        
            <div className="h-full md:h-screen w-full overflow-x-hidden bg-homeN bg-cover pb-[300px]">
              {loadingApiCall ? (
                <LoadingPage />
              ) : (
                <>
                  <div className="search top-24 p-5 flex justify-center items-center">
                    <div className="w-3/5">
                      <SearchBar />
                    </div>
                  </div>
                  <div className="text-center px-5 py-5">
                    <div className="flex md:gap-20 flex-col items-end">
                      <div className="grid grid-cols-2 md:grid-cols-3 place-items-center">
                        {deckInfo.length > 0 &&
                          deckInfo.map((card) => {
                            return (
                              <img
                                key={card.id}
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
        </div>
      );
  }
}

export default withDarkMode(Home);
