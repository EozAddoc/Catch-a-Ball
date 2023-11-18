import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie"
function Battle() {
  const { userId } = useParams();
  const [myId, setMyId]=useState('')
  useEffect(() => {
    const token = jsCookie.get("token");
console.log(token)
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.userId)
        setMyId(decodedToken.userId)
        // setUserData(decodedToken);
      } catch (error) {
        // Handle error, such as invalid token
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);
  console.log(userId, myId);
  return (
    <div className="bg-blue-700">
      <div className="bg-routeN bg-cover h-screen flex flex-col items-center justify-center">
        <div>
          <div className=" bg-blue-950">
            <div className="absolute bottom-28 left-52 h-2/3 w-1/4 ">
              <ProfileCard id={myId}/>
            </div>
            <div className="heart w-1/3 h-1/5 absolute bottom-16 left-1/2 flex  ">
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                className="h-1/2 m-3"
              ></img>
              <img
                src={process.env.PUBLIC_URL + "/heartG.png"}
                alt="greyheart"
                className="h-1/2 m-3 "
              ></img>
              <img src={process.env.PUBLIC_URL + "/heartG.png"} alt="greyheart" className="h-1/2 m-3"></img>
              <img src={process.env.PUBLIC_URL + "/Rheart.png"} alt="greyheart" className="h-1/2 m-3"></img>
              <img src={process.env.PUBLIC_URL + "/Rheart.png"} alt="greyheart" className="h-1/2 m-3"></img>
            </div>
            <div
              className="absolute bottom-10   left-20 bg-blue-500"
              style={{ height: "38px", width: "750px", borderRadius: "50%" }}
            ></div>
          </div>
          <div>
            <div className="absolute bottom-80 right-48 h-2/5 w-1/6 ">
              <ProfileCard id={userId}/>
            </div>
            <div className="heart  w-1/3 h-1/6 absolute bottom-80 right-96 flex  ">
              <img src={process.env.PUBLIC_URL + "/heartG.png"} alt="greyheart1" className="h-1/3 m-3"></img>
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
              <img src={process.env.PUBLIC_URL + "/Rheart.png"} alt="redHeart" className="h-1/3 m-3"></img>
              <img src={process.env.PUBLIC_URL + "/Rheart.png"} alt="redHeart" className="h-1/3 m-3"></img>
            </div>
            <div
              className="absolute bottom-72 right-36 bg-blue-500"
              style={{ height: "15px", width: "400px", borderRadius: "50%" }}
            ></div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Battle;
