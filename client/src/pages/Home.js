import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import LoadingPage from '../LoadingPage';

import Sidebar from "../components/SideBar";


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

    return (
        <div className='bg-gray-700'>
            {
                auth ?
                    <div class="min-h-screen min-w-screen bg-home bg-cover opacity-100">
                        <div className="text-center min-h-screen px-5 py-5">
                            <div className='flex'>
                                <div className='bg-[#070741] mx-[0px] md:mx-[150px] lg:mx-[300px] mb-2 md:mb-5 rounded-lg px-5 py-7 text-white'>
                                    <h2 className='text-5xl lg:text-8xl tracking-wide font-pixel'>YOUR DECK</h2>
                                </div>
                                <div className='text-white font-pixel flex items-center bg-[#070741] rounded-full'>
                                    <div className='mx-4 mt-16px'>
                                        <h3>{userData.username}</h3>
                                        <h4>LVL {userData.lvl}</h4>
                                    </div>
                                    <img className="h-24 rotate-6" src={avatar.images?.large} alt={avatar.name} />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 place-items-center'>
                                {deckInfo.length > 0 && deckInfo.map((card) => {
                                    return (
                                        <img className="hover:scale-150 transition w-36 p-2 md:w-64" src={card.images?.large} alt={card.name} />
                                    )
                                })}
                            </div>
                            <Sidebar />
                        </div>
                    </div>
                    : navigate('/')
            }

        </div>
    )
}
export default Home;