import axios from 'axios';
import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Home(){
    const [auth,setAuth]= useState(false);
    const [mess,setMess]= useState('')
    const [username,setuserName]= useState('')
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8080/home')
        .then(res=>{
            if(res.data.Status="Sucess"){
                setAuth(true)
                setuserName(res.data.username)
                NavigationPreloadManager('/login')
            }else{
                setAuth(false)
                setMess(res.data.err)
            }
        })
        .catch(err => console.log("error", err))
    })
    return (
        <div className='container mt-4'>
            {
                auth ?
                <div>
                    <h3>
                        You are authorized {username}
                    </h3>
                </div>
                :
                <div>
                    <h3>Not authorized</h3>
                </div>
            }
    
        </div>
    )
}
export default Home;
