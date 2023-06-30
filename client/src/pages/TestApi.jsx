import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';

function TestApi() {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const [card, setCard] = useState({});

    useEffect(() => {   // setCard(card) must be in a useEffect so it doesn't call the
                        // API over and over

        pokemon.card.find('base1-6')    // base1-4 = Charizard; get a specific
                                        // card with its id
            .then(card => {
                console.log(card);
                setCard(card);
            });
    }, []); // empty array for useEffect so it only renders once

    return (
        <div>
            <img src={card.images?.large ?? "pkmn-cardback.png"} />
        </div>
    )
}

export default TestApi;