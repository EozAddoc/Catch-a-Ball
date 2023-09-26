import pokemon from 'pokemontcgsdk';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

function DeckApiCall(apiIds) {
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

    return cards;
}

export default DeckApiCall;