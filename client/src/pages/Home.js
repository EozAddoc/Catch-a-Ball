import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

import Menu from '../components/Menu/Menu';


function Home() {
    const navigate = useNavigate();
    const [auth,setAuth]= useState(false);
    const [mess,setMess]= useState('')
    const [username,setuserName]= useState('')
    const [userData,setUserData]= useState('')
    const [deckData,setDeckData]= useState('')

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:1117/user')
        .then(res=>{
            if(res.data.Status==="Success"){
                setAuth(true)
                setUserData(res.data.userData)
            }else{
                setAuth(false)
                setMess(res.data.err)
            }
        })
        .catch(err => console.log("error", err))
    },[])
    useEffect(() => {
        axios.get('http://localhost:1117/deck')
        .then(res=>{
            if(res.data.Status==="Success"){
                setDeckData(res.data.deckData);
            }else{
                setMess(res.data.err)
            }
        })
        .catch(err => console.log("error", err))
    },[])

    const handleLogout = () => {
        axios.get('http://localhost:1117/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload();
                    navigate('/');
                } else {
                    alert("error logging out")
                }
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='bg-gray-700'>
            {
                auth ?
                    <div class="min-h-screen min-w-screen bg-home bg-cover opacity-100">
                        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                            <Sidebar />
                        </div>
                        <div className='opacity-100'>
                            {/* <Menu></Menu> */}
                            {/* <h1>WELCOME</h1> */}
                        </div>


                        <div>
                            <h2></h2>
                        </div>

                        {/* <h3>
                        You are authorized {username}
                    </h3>
                    <button className='btn btn-danger' onClick={handleLogout}> Logout</button> */}

                    </div>
                    :
                    navigate('/')
            }

        </div>
    )
}
export default Home;