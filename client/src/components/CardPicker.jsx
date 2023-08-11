import { useState } from 'react';

function CardPicker({ cardImg, nameAlt, api_Id, onClick }) {
    const [card, setCard] = useState("/pkmn-cardback.png");
    const [name, setName] = useState("Back of Pokémon card.")

    const handleClick = () => {
        setCard(cardImg);
        setName(nameAlt);
        onClick(api_Id); // Call the onClick function with the api_Id
    };

    return (
        <img alt={name} className="max-w-3 p-2 xl:max-w-xs" src={card} onClick={handleClick} />
    );
}

export default CardPicker;
