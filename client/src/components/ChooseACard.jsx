import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemon from 'pokemontcgsdk';
import Axios from 'axios';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';

function ChooseACard({ apiIds, userId, text, maxCardsChosen, hidden, redirectHome }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCardApis, setSelectedCardApis] = useState([]);

  const fetchCard = useCallback(async (id) => {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const card = await pokemon.card.find(id);
    return card;
  }, []);

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
  }, [apiIds, queryClient, fetchCard]);

  useEffect(() => {
    const sendCards = async (api_Ids) => {
      if (api_Ids.length !== maxCardsChosen) {
        console.error('You must select exactly 3 cards.');
        return;
      }
      if (redirectHome) {
        let avatar_api = api_Ids[0];
        try {
          await Axios.post(process.env.REACT_APP_URL + '/signup/avatar', {
            userId: userId,
            avatar_api: avatar_api,
          });
        } catch (error) {
          console.error('Error sending avatar:', error);
        }
      } else {
        try {
          await Axios.post(process.env.REACT_APP_URL + '/signup/pokemon', {
            userId: userId,
            api_Ids: api_Ids,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (selectedCardApis.length === maxCardsChosen) {
      sendCards(selectedCardApis);
      if (!redirectHome) {
        setTimeout(() => {
          navigate('/signup/avatar');
        }, 750);
      } else {
        navigate('/home');
      }
    }
  }, [selectedCardApis, navigate, maxCardsChosen, redirectHome, userId]);

  const handleCardClick = (api_Id) => {
    setSelectedCardApis((prevSelectedCardApis) => {
      if (prevSelectedCardApis.length < maxCardsChosen) {
        return [...prevSelectedCardApis, api_Id];
      }
      return prevSelectedCardApis;
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
  }

  return (
    <>
      <div className="text-center flex justify-center p-6">
        <h1 className="text-yellow-400 text-l font-bold">{text}</h1>
      </div>
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-4 lg:gap-4">
        {isLoading ? <div>Loading...</div> : cardImgs}
      </div>
    </>
  );
}

export default ChooseACard;
