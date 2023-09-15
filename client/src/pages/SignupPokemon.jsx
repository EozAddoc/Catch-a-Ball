import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const queryClient = new QueryClient();

function SignupPokemon() {
  const apiIds = [
    "sm75-1", // Charmander
    "ex6-55", // Bulbasaur
    "bw10-14", // Squirtle
    "smp-SM86", // Pikachu
    "swsh1-83", // Gastly
    "swshp-SWSH175", // Eevee
    "hgss4-67", // Machop
    "pl4-65" // Geodude
  ];
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
    <div className="bg-blue-900 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ChooseACard
          apiIds={apiIds}
          text={`Hello, ${username}! Choose three cards to start your journey...`}
          username={username} 
          maxCardsChosen={3} //choose three pokemon
          hidden={true}
          page={0}
        />    </QueryClientProvider>
    </div>
  );
}

export default SignupPokemon;
