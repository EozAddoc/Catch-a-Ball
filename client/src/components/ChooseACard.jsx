import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemon from 'pokemontcgsdk';
import Axios from 'axios';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

function ChooseACard({ apiIds, text, username, maxCardsChosen, hidden}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  

  const fetchCard = async (id) => {
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
      console.log(api_Ids)
      sendCards(api_Ids)
      navigate('/signup/avatar');
    }
  }, [api_Ids, navigate]);

  const handleCardClick = (api_Id) => {
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

    // Assuming you have Axios imported and set up correctly
    Axios.post('http://localhost:8080/signup/pokemon', {
      username: username,
      api_Ids: api_Ids
    })
      .then((resp) => {
        console.log('Cards sent successfully');
        navigate('/signup/avatar');
      })
      .catch((error) => {
        console.log(error);
      });
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
