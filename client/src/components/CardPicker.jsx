import { useState } from 'react';

function CardPicker({ cardImg, nameAlt }) {
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