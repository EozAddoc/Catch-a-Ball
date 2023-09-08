import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import pokemon from 'pokemontcgsdk';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';

function ChooseACard({ apiIds, text }) {
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

  if (isError) {
    console.error('Failed to fetch cards');
  };

  let cardImgs = [];
  let cardApis =[]


  for (let i in cards) {
    cardImgs.push(
      <CardPicker
        cardImg={cards[i].images?.large ?? "/pkmn-cardback.png"}
        nameAlt={cards[i].name ?? "Back of Pokémon card."}
        api_Id={cards[i].id ?? "no api :("} 
        key={i}
        onClick={(api_Id) => {
          console.log('Clicked card with api_Id:', api_Id);
          if(cardApis.length === 2){
            navigate('/home');
          }else{
            cardApis.push(api_Id);
            console.log(cardApis);
          }
          
        }}
      />
    );
  };
  

  return (
    <>
      <div className="text-center flex justify-center p-6">
        <h1 className=" text-yellow-400 text-l font-bold">
          {text}
        </h1>
      </div>
      <div className="grid grid-cols-2 justify-items-center
      lg:grid-cols-4 lg:gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          cardImgs
        )}
      </div>
      </>
  );
};

export default ChooseACard;
