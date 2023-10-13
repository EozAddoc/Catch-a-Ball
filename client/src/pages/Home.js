import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import pokemon from 'pokemontcgsdk';
import LoadingPage from '../LoadingPage';
import ProfileCard from '../components/ProfileCard';
import Sidebar from '../components/SideBar';

async function ApiCall(id) {
  pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
  const card = await pokemon.card.find(id);
  return card;
}

function Home() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [mess, setMess] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userData, setUserData] = useState('');
  const [deckData, setDeckData] = useState([]);
  const [deckInfo, setDeckInfo] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_URL}:1117/user`)
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setUserData(res.data.userData);
        } else {
          setAuth(false);
          setMess(res.data.err);
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_URL}:1117/deck`)
      .then(res => {
        if (res.data.Status === 'Success') {
          setDeckData(res.data.deckData);
        } else {
          setMess(res.data.err);
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  useEffect(() => {
    deckData.forEach(async (deckItem) => {
      const data = await ApiCall(deckItem.card_api);
      setDeckInfo((value) => [...value, data]);
      setAvatar(await ApiCall(userData.avatar_api));
    });
  }, [deckData]);

  return (
    <div className="bg-gray-700">
      {auth ? (
        <div className="min-h-screen bg-home bg-cover opacity-100">
          <div className="flex">
            <div className="fixed top-0 right-0 p-4 h-1/5 w-1/3 text-white">
              <ProfileCard />
            </div>
          </div>

          <Sidebar />
          <div className="flex items-center justify-center h-screen">
            <div className="w-1/2 h-32 bg-blue-800 font-bold font-si text-white p-4 rounded-md shadow-md">
            <div className="w-full h-full">
      <span className="text-white  text-2xl font-inter font-semibold italic break-words">
        Win 3 battles in the battle arena
      </span>
      <span className="text-white text-2xl font-inter font-semibold break-words">
        {'              '}
      </span>
      <span className="text-yellow-400 text-lg  font-inter font-semibold break-words">
        rewards 100 xp <br />
      </span>
      <span className="text-white text-sm font-inter font-semibold break-words">
        {' '}
      </span>
    </div>            </div>
          </div>
        </div>
      ) : (
        navigate('/')
      )}
    </div>
  );
}

export default Home;
