import { useState } from 'react';

function CardPicker({ cardImg, nameAlt }) {
    const [card, setCard] = useState("/pkmn-cardback.png");
    const [name, setName] = useState("Back of Pokémon card.")

    return (

        <img alt={name} class="max-w-3 p-2 xl:max-w-xs" src={card} onClick={() => {
            setCard(cardImg);
            setName(nameAlt)
        }} />

    )
}

export default CardPicker;