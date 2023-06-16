import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';

function TestApi() {
    pokemon.configure({ apiKey: 'fd4c85a9-6be2-4277-a624-884003a17516' });
    const [card, setCard] = useState({});
    useEffect(() => {
        pokemon.card.find('base1-4') // base1-4 = Charizard
            .then(card => {
                console.log(card);
                setCard(card);
            });
    }, []);

    return (
        <div>
            <img src={card.images?.large ?? "pok3.png"} />
        </div>
    )
}

export default TestApi;