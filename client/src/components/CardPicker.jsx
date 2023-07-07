import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';

function CardPicker({ cardImg, nameAlt }) {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const [card, setCard] = useState("/pkmn-cardback.png");
    const [name, setName] = useState("Back of Pokémon card.")

    return (
        <div>
            <img alt={name} class="max-w-xs" src={card} onClick={() => {
                setCard(cardImg);
                setName(nameAlt)
            }} />
        </div>
    )
}

export default CardPicker;