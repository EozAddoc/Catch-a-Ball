import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

import Menu from '../components/Menu/Menu';


function Home() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [mess, setMess] = useState('')
    const [username, setuserName] = useState('')
    const [userData, setUserData] = useState('')
    const [deckData, setDeckData] = useState([])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:1117/user')
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
        axios.get('http://localhost:1117/deck')
            .then(res => {
                if (res.data.Status === "Success") {
                    setDeckData(res.data.deckData);
                } else {
                    setMess(res.data.err)
                }
            })
            .catch(err => console.log("error", err))
    }, []);

    return (
        <div className='bg-gray-700'>
            {
                auth ?
                    <div class="min-h-screen min-w-screen bg-home bg-cover opacity-100">
                        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                            <h2>Your Deck:</h2>
                            <ul>
                                {deckData.length > 0 ? deckData.map((deckItem) => (
                                    <li key={deckItem.id}>
                                        <h3>Card ID: {deckItem.id}</h3>
                                        <p>User ID: {deckItem.user_id}</p>
                                        <p>Card API: {deckItem.card_api}</p>
                                        <p>Experience: {deckItem.Experience}</p>
                                        <p>Chosen For Battle: {deckItem.Chosen_For_Battle}</p>
                                    </li>
                                )) : "no deck :c"}
                            </ul>
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
    )
}
export default Home;