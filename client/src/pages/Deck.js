import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemon from 'pokemontcgsdk';
import LoadingPage from '../LoadingPage';
import Sidebar from '../components/SideBar';

async function ApiCall(id) {
  pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
  const card = await pokemon.card.find(id);
  return card;
}

function Deck() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [userData, setUserData] = useState('');
  const [deckData, setDeckData] = useState([]);
  const [battleLvl, setBattleLvl] = useState(0); // Declare battleLvl state
  const [deckInfo, setDeckInfo] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://' + process.env.REACT_APP_URL + ':1117/user')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setUserData(res.data.userData);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  useEffect(() => {
    axios.get('http://' + process.env.REACT_APP_URL + ':1117/deck')
      .then(res => {
        if (res.data.Status === 'Success') {
          setDeckData(res.data.deckData);

        } else {
          console.log("err")
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const deckInfoArray = [];
      let battleLvl =0;
      for (const deckItem of deckData) {
        const data = await ApiCall(deckItem.card_api);
        const battleChosen = deckItem.Chosen_For_Battle
        battleLvl += deckItem.Experience;
        setDeckInfo((value) => [...value, data]);
        setAvatar(await ApiCall(userData.avatar_api));
      }
      setBattleLvl(battleLvl); // Update battleLvl state
      console.log(battleLvl);
    };

    fetchData();
  }, [deckData, userData]);

  return (
    <div className='bg-gray-700'>
      {auth ? (
        <div class='min-h-screen min-w-screen bg-homeN bg-cover opacity-100'>
          <div className='text-center w-full text-yellow-500 p-5'>
            <h1 > Current Battle level : {battleLvl} </h1>
          </div>
          <div className='text-center min-h-screen px-5 py-5'>
            <div className='flex'></div>
            <div className='grid grid-cols-2 md:grid-cols-3 place-items-center'>
              {deckInfo.length > 0 &&
                deckInfo.map((card, index) => (
                  <div key={index} className='relative'>
                    <img
                      className='hover:scale-150 transition w-30 p-2 md:w-64'
                      src={card.images?.large}
                      alt={card.name}
                    />
                    {deckData[index].Chosen_For_Battle  && (
                      <img
                        src='success.png'
                        className='absolute bottom-0 right-0 h-1/6'
                        alt='success'
                      />
                    )}
                  </div>
                ))}
            </div>
            <Sidebar />
          </div>
        </div>
      ) : (
        navigate('/')
      )}
    </div>
  );
}

export default Deck;
