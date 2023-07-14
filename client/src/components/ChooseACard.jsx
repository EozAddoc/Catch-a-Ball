import { useState, useEffect } from 'react';
import pokemon from 'pokemontcgsdk';
import CardPicker from './CardPicker';
import { useQuery, useQueryClient } from 'react-query';

function ChooseACard({ apiIds, text }) {
  const queryClient = useQueryClient();

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
  }

  let cardImgs = [];

  for (let i in cards) {
    cardImgs.push(
      <CardPicker
        cardImg={cards[i].images?.large ?? "/pkmn-cardback.png"}
        nameAlt={cards[i].name ?? "Back of Pokémon card."}
        key={i}
      />
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen">
      <div className="flex justify-center">
        <h1 className="w-[1164px] h-[129px] text-yellow-400 text-[64px] font-bold">
          {text}
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          cardImgs
        )}
      </div>
    </div>
  );
}

export default ChooseACard;
