import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';
import CardPicker from '../components/CardPicker';

function SignupPokemon() {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const [cards, setCards] = useState([]);

    const apiIds = [
        "sm75-1", // Charmander
        "ex6-55", // Bulbasaur
        "bw10-14", // Squirtle
        "smp-SM86", // Pikachu
        "swsh1-83", // Gastly
        "swshp-SWSH175", // Eevee
        "hgss4-67", // Machop
        "pl4-65" // Geodude                          
    ];

    useEffect(() => {   // setCard(card) must be in a useEffect so it doesn't call the API over and over

        apiIds.map(id =>
            pokemon.card.find(id)
                .then(card => {
                    if (!cards.includes(card)) {
                        setCards(cards => [...cards, card])
                    }
                })
        )

    }, []); // empty array for useEffect so it only renders once

    let cardImgs = [];

    for (let i in cards) {
        cardImgs.push(<CardPicker cardImg={cards[i].images?.large ?? "/pkmn-cardback.png"} nameAlt={cards[i].name ?? "Back of pokemon card."} key={i} />)
    }

    return (
        <div class="bg-custom-pokeB min-h-screen">
            <div class="flex justify-center">
            <h1 class="w-[1164px] h-[129px] text-yellow-400 text-[64px] font-bold">
                Choose three to start your journey...
            </h1>
            </div>
            <div class="grid grid-cols-4 gap-4 justify-items-center">
                {cardImgs}
            </div>
        </div>
    )
}

export default SignupPokemon;