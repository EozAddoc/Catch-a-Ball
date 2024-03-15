import Sidebar from '../components/SideBar'
import Searchbar from '../components/SearchBar'
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie"

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults = location.state ? location.state.searchResults : [];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [myId, setMyId]=useState('')

  useEffect(() => {
    window.addEventListener("resize", () => {
      const tempIsMobile = window.innerWidth < 1200;
      if (tempIsMobile !== isMobile) setIsMobile(tempIsMobile);
    }, false);
  }, [isMobile]);

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
  function getRandomColor(index) {
    const colors = ['#D70F0F', '#299917', '#9036AF', '#0909F9'];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  }

  const Battle = (userId) => {
    if(myId === parseInt(userId)){
      alert("You cannot battle yourself!");
      return; 
    }
    navigate(`/Opponent/${userId}`);
  };


  return (
    <div className="bg-blue-950">
      <div className="bg-townNN bg-cover h-screen flex flex-col items-center justify-center">
        <div className="search w-1/2 mb-8 fixed top-20 mr-5">
          <Searchbar searchResults={searchResults} />
        </div>
        <div className="w-4/5">
          <h2 className="text-white font-bold justify-center text-center m-10 ">
            {searchResults.length} &nbsp; R&nbsp;E&nbsp;S&nbsp;U&nbsp;L&nbsp;T&nbsp;S&nbsp;:
          </h2>
          <div className="flex flex-col gap-10">
            {isMobile && searchResults.map((result, index) => (
              index < 3 &&
              <div key={index} className="flex flex-col lg:flex-row lg:gap-10 lg:items-center lg:justify-center w-full">
                <div
                  style={{ backgroundColor: getRandomColor(index), letterSpacing: '0.2em' }}
                  className="rounded-full text-center flex items-center text-white font-semibold lg:w-3/5 tracking-wide"
                >
                  <div className="flex-1">
                    <div className="bg-white m-1 rounded-full w-12 h-12">
                      {/* Content of the circular div */}
                    </div>
                  </div>
                  <div className="flex-1">
                    {result.username}
                  </div>
                  <div className="flex-1 text-white font-semibold tracking-wide">
                    L&nbsp;V&nbsp;L {result.battleLvl}
                  </div>
                </div>
                <div className="bg-yellow-300 text-center font-bold text-xl rounded-full mt-4 lg:m-0 lg:w-1/5">
                  <div className="m-2">
                    <button onClick={() => Battle(result.id)}>
                      <p className="m-3">B&nbsp;A&nbsp;T&nbsp;T&nbsp;L&nbsp;E</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!isMobile && searchResults.map((result, index) => (
              index < 5 &&
              <div key={index} className="flex flex-col lg:flex-row lg:gap-10 lg:items-center lg:justify-center w-full">
                <div
                  style={{ backgroundColor: getRandomColor(index), letterSpacing: '0.2em' }}
                  className="rounded-full text-center flex items-center text-white font-semibold lg:w-3/5 tracking-wide"
                >
                  <div className="flex-1">
                    <div className="bg-white m-1 rounded-full w-12 h-12">
                      {/* Content of the circular div */}
                    </div>
                  </div>
                  <div className="flex-1">
                    {result.username}
                  </div>
                  <div className="flex-1 text-white font-semibold tracking-wide">
                    L&nbsp;V&nbsp;L {result.battleLvl}
                  </div>
                </div>
                <div className="bg-yellow-300 text-center font-bold text-xl rounded-full lg:m-0 lg:w-1/5">
                  <div className="m-2">
                    <button onClick={() => Battle(result.id)}>
                      <p className="m-3">B&nbsp;A&nbsp;T&nbsp;T&nbsp;L&nbsp;E</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Search;
