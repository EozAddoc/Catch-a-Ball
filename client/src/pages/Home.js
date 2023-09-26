import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import { useQuery, useQueryClient } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

import Sidebar from "../components/SideBar";


async function ApiCall(id) {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    // let cards = [];

    // apiIds.map(async (id) => {
    const card = await pokemon.card.find(id);
    // cards.push(card);
    // })

    return card;

}

function Home() {
    const queryClient = new QueryClient();

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [mess, setMess] = useState('');
    const [username, setuserName] = useState('');
    const [userData, setUserData] = useState('');
    const [deckData, setDeckData] = useState([]);
    const [deckInfo, setDeckInfo] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(process.env.URL + ':1117/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    setUserData(res.data.userData)
                } else {
                    setAuth(false)
                    setMess(res.data.err)
                }
            })
            .catch(err => console.log("error", err))
    }, []);

    useEffect(() => {
        axios.get(process.env.URL + ':1117/deck')
            .then(res => {
                if (res.data.Status === "Success") {
                    setDeckData(res.data.deckData);
                } else {
                    setMess(res.data.err)
                }
            })
            .catch(err => console.log("error", err))
    }, []);

    // const { data: cards, isError, isLoading } = useQuery(
    //     'cards',
    //     ApiCall(deckData)
    // );

    useEffect(() => {
        deckData.map(async (deckItem) => {
            const data = await ApiCall(deckItem.card_api);
            setDeckInfo((value) => [...value, data]);
        });
    }, [deckData]);

    console.log(deckInfo)

    return (
        // <QueryClientProvider client={queryClient}>
        <div className='bg-gray-700'>
            {
                auth ?
                    <div class="min-h-screen min-w-screen bg-home bg-cover opacity-100">
                        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                            <h2>Your Deck:</h2>
                            <div className='flex'>
                            {deckInfo.length > 0 && deckInfo.map((card) => {
                                return (
                                    <img className="max-w-3 p-2 xl:max-w-xs" src={card.images.large} />
                                )
                            })}
                            </div>
                            <Sidebar />
                        </div>
                        <div className='opacity-100'>
                            {/* <Menu></Menu> */}
                            {/* <h1>WELCOME</h1> */}
                        </div>

                        {/* <h3>
                        You are authorized {username}
                    </h3>
                    <button className='btn btn-danger' onClick={handleLogout}> Logout</button> */}

                    </div>
                    : navigate('/')
            }

        </div>
        // </QueryClientProvider>

    )
}
export default Home;