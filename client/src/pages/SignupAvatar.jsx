import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const queryClient = new QueryClient();

function SignupAvatar() {
    const apiIds = [
        "swsh10-189", // Zisu
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189",
        "swsh10-189"
    ]
    const [mess, setMess] = useState('')

    const [username, setuserName] = useState('')
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8080/signup/pokemon')
      .then(res => {
        if (res.data.Status === "Sucess") {
          setuserName(res.data.username)
        } else {
          setMess(res.data.err)
        }
      })
      .catch(err => console.log("error", err))
  })


    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-blue-900 min-h-screen">
                <ChooseACard apiIds={apiIds}
                    text={"Choose your trainer!"}
                    maxCardsChosen={1} //choose one trainer
                    hidden={false}
                    username={username}
                    page ={1}
                />
            </div>
        </QueryClientProvider>
    )

}

export default SignupAvatar;