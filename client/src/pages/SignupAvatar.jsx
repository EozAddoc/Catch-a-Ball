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
    const [userId, setUserId] = useState(0);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL+'/user')
      .then(res => {
        if (res.data.Status === "Success") {
          setUserId(res.data.userData.id)
        } else {
          console.log(res.data.err)
        }
      })
      .catch(err => console.log("error", err))
  },[])


    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-blue-900 min-h-screen">
                <ChooseACard apiIds={apiIds}
                    text={"Choose your trainer!"}
                    maxCardsChosen={1} //choose one trainer
                    hidden={false}
                    userId={userId}
                    redirectHome={true}
                />
            </div>
        </QueryClientProvider>
    )

}

export default SignupAvatar;