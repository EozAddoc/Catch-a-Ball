import axios from "axios";
import { useNavigate } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import '../index'
import React, { useState, useEffect } from "react";

async function ApiCall(id) {
  pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });

  const card = await pokemon.card.find(id);

  return card;
}
 // Import the styles.css file
function ProfileCard () {

  const [userData, setUserData] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [mess, setMess] = useState('');
    const [avatar, setAvatar] = useState('');
    const [deckData, setDeckData] = useState([]);
    const [deckInfo, setDeckInfo] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://' + process.env.REACT_APP_URL + ':1117/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUserData(res.data.userData);
                } else {
                    setAuth(false);
                    setMess(res.data.err);
                }
            })
            .catch(err => console.log("error", err));
    }, []);

    useEffect(() => {
        axios.get('http://' + process.env.REACT_APP_URL + ':1117/deck')
            .then(res => {
                if (res.data.Status === "Success") {
                    setDeckData(res.data.deckData);
                } else {
                    setMess(res.data.err);
                }
            })
            .catch(err => console.log("error", err));
    }, []);

    useEffect(() => {
        deckData.map(async (deckItem) => {
            const data = await ApiCall(deckItem.card_api);
            setDeckInfo((value) => [...value, data]);
            setAvatar(await ApiCall(userData.avatar_api));
        });
    }, [deckData]); 

    return  (
      <div className="h-full w-full flex items-center justify-center">
      <div className="shadow-md w-full h-full cardBody rounded-2xl bg-cover border-gray-400 overflow-hidden relative" style={{ backgroundImage: 'url("water.jpg")', backgroundSize: 'cover', borderWidth: '20px' }}>
          <h1 className="bg-gradient-to-t from-gray-400 via-gray-200 to-gray-400 text-center text-l font-bold m-2 italic rounded-full">TRAINER</h1>

            <div className="header mb-2">

         <div className="nameAndHealth flex justify-between mx-7">
                <p className="name text-m font-bold"> {userData.username}</p>
           
                <div className="floatRight flex items-center">
                  
                  <p className="health text-black mr-4 mt-2">LVL {userData.lvl}</p>
                  <button className='bg-blue-200 w-8'> <img src="https://jcr08.github.io/pokemon-card/images/water-energy.png" alt="Water Energy Symbol" />
</button>

                </div>
              </div>
            </div>
            <div className=" w-6/7 h-1/3 m-4 flex items-center justify-center">
  <div className="border-gray-400 border-8 shadow-2xl h-full w-full rounded-2xl">
    <img src={avatar.images?.large}  alt="AvatarImg" className="personnel-img" />
  </div>
</div>

    
            <div className="stats bg-gradient-to-t from-gray-400 via-gray-200 to-gray-400 rounded-2xl text-xs italic rounded-xl whitespace-nowrap mx-auto w-3/4 text-center mt-2">
              <p>New Player</p>
            </div>
    
            <div className="attacks">
              {/* Pokemon Attacks */}
              <div className="specificAttack  items-center">
               
                <div className="attackDescription m-3 ">
                  <p>
                    <span className="attackName font-bold text-lg">Introduction</span> Optional
                  </p>
                </div>
                <div className="power text-center text-xl">
                  10
                </div>
              </div>
    
              <hr className=" border-black w-95 mx-auto" />
    
            </div>
    
            <div className="attributes grid grid-cols-3 text-center w-full">
              {/* Deck Attributes */}
              <div className="weakness">
                <p className="font-bold text-sm">Attack</p>
                <img src="https://jcr08.github.io/pokemon-card/images/electric-energy.png" alt="Electric Energy Symbol" className="w-4" />
              </div>
              <div className="resistance">
                <p className="font-bold text-sm">Defence</p>
              </div>
              <div className="retreatCost">
                <p className="font-bold text-sm">retreat cost</p>
                <img src="https://jcr08.github.io/pokemon-card/images/normal-energy.png" alt="Normal Energy Symbol" className="w-4" />
              </div>
            </div>
    
            <div className="description border-2 border-gray-400 text-xs italic mx-auto w-5/6 p-1 mt-1.5">
              <p>
                Description
              </p>
            </div>
    
            <div className="footer text-xs p-0.5 text-center absolute bottom-0 left-0 w-full">
              <div>
                <strong>Illus.MitsuhiroArica</strong>
              </div>
            </div>
          </div>
        </div>
    )
}
export default ProfileCard;