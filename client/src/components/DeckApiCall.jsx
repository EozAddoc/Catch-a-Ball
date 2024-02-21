import pokemon from 'pokemontcgsdk';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

function DeckApiCall(apiIds) {
    const queryClient = useQueryClient();

    const fetchCard = async (id) => {
            try {
              pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
              const card = await pokemon.card.find(id);
              return card;
            } catch (error) {
              if (error.response && error.response.status === 404) {
                return null; 
              } else {
                throw error;
              }
            }
          
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

    return cards;
}

export default DeckApiCall;