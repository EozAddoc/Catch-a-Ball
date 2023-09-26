import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemon from 'pokemontcgsdk';
import Axios from 'axios';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';

function ChooseACard({ apiIds,userId, text, username, maxCardsChosen, hidden, redirectHome}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchCard = async (id) => {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const card = await pokemon.card.find(id);
    return card;
  };

  const { data: cards, isError, isLoading } = useQuery(
    'cards',
    () => Promise.all(apiIds.map(fetchCard)),
    {
      initialData: () => queryClient.getQueryData('cards') ?? [],
    }
  );

  useEffect(() => {
    apiIds.forEach((id) => {
      queryClient.prefetchQuery(['cards', id], () => fetchCard(id));
    });
  }, [apiIds, queryClient]);

  const [api_Ids, setSelectedCardApis] = useState([]);

  useEffect(() => {
    if (api_Ids.length === maxCardsChosen) {
      
      // console.log(api_Ids)
      sendCards(api_Ids)
      if(!redirectHome){
        setTimeout(() => {
          navigate('/signup/avatar')
        }, 500);
      }else{
        navigate('/home');
      }
   
    }
  }, [api_Ids, navigate]);

  const handleCardClick = (api_Id) => {
    console.log(userId)
    setSelectedCardApis((prevSelectedCardApis) => {
      if (prevSelectedCardApis.length < maxCardsChosen) {
        return [...prevSelectedCardApis, api_Id];
      }
      console.log('Clicked card with api_Id:', prevSelectedCardApis);

      return prevSelectedCardApis;
    });
  };

  const sendCards = (api_Ids) => {
    // Check if exactly 3 cards have been selected
    if (api_Ids.length !== maxCardsChosen) {
      console.error('You must select exactly 3 cards.');
      return;
    }
    if (redirectHome) {
      console.log(userId);
      let avatar_api = api_Ids[0]; // Assuming you're only selecting one avatar
      try {
         Axios.post('http://188.165.238.74:1117/signup/avatar', {
          userId: userId,
          avatar_api: avatar_api,
        });
        console.log('Avatar sent to back-end successfully');
      } catch (error) {
        console.error('Error sending avatar:', error);
      }
    } else {
      try {
        Axios.post('http://188.165.238.74:1117/signup/pokemon', {
          userId: userId,
          api_Ids: api_Ids,
        });
        console.log('Cards sent successfully');
      } catch (error) {
        console.error(error);
      }
    }
  };
  


  if (isError) {
    console.error('Failed to fetch cards');
  }

  let cardImgs = [];

for (let i in cards) {
    cardImgs.push(
      <CardPicker
        cardImg={cards[i].images?.large ?? "/pkmn-cardback.png"}
        nameAlt={cards[i].name ?? "Back of Pokémon card."}
        api_Id={cards[i].id ?? "no api :("} 
        key={i}
        hidden={hidden}
        onClick={handleCardClick}
      />
    );
  };
  


  return (
    <>
      <div className="text-center flex justify-center p-6">
        <h1 className=" text-yellow-400 text-l font-bold">{text}</h1>
      </div>
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-4 lg:gap-4">
        {isLoading ? <div>Loading...</div> : cardImgs}
      </div>
    </>
  );
}

export default ChooseACard;
