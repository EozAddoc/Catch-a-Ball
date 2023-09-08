import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemon from 'pokemontcgsdk';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';

function ChooseACard({ apiIds, text, maxCardsChosen }) {
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

  const [selectedCardApis, setSelectedCardApis] = useState([]);

  useEffect(() => {
    if (selectedCardApis.length === maxCardsChosen) {
      console.log(selectedCardApis)
      navigate('/home');
    }
  }, [selectedCardApis, navigate]);

  const handleCardClick = (api_Id) => {
    setSelectedCardApis((prevSelectedCardApis) => {
      if (prevSelectedCardApis.length < 3) {
        return [...prevSelectedCardApis, api_Id];
      }
      console.log('Clicked card with api_Id:', prevSelectedCardApis);

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
        cardImg={cards[i].images?.large ?? '/pkmn-cardback.png'}
        nameAlt={cards[i].name ?? 'Back of Pokémon card.'}
        api_Id={cards[i].id ?? 'no api :('}
        key={i}
        onClick={handleCardClick}
      />
    );
  }

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
