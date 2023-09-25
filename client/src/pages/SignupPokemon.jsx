import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const queryClient = new QueryClient();

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

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
  const [userId, setUserId] = useState(0)
  const [username, setuserName] = useState('')
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:1117/user')
      .then(res => {
        if (res.data.Status === "Success") {
          setuserName(res.data.userData.username)
          setUserId(res.data.userData.id)
        } else {
          console.log(res.data.err)
        }
      })
      .catch(err => console.log("error", err))
  },[])


  shuffle(apiIds);

  return (
    <div className="bg-blue-900 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ChooseACard
          apiIds={apiIds}
          text={`Hello, ${username}! Choose three cards to start your journey...`}
          username={username} 
          userId={userId}
          maxCardsChosen={3} //choose three pokemon
          hidden={true}
          redirectHome={false}
        />    </QueryClientProvider>
    </div>
  );
}

export default SignupPokemon;
