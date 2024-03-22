import { useState, useEffect } from 'react';

function CardPicker({ cardImg, nameAlt, api_Id, onClick, hidden }) {
    const [card, setCard] = useState("/pkmn-cardback.png");
    const [name, setName] = useState("Back of Pokémon card.");

    useEffect(() => {
        if (!hidden) {
            setCard(cardImg);
            setName(nameAlt);
        }
    },[cardImg, hidden, nameAlt])

    const handleClickRevealed = () => {
        onClick(api_Id); 
    }

    const handleClickHidden = () => {
        setCard(cardImg);
        setName(nameAlt);
        onClick(api_Id); 
    };

    return (
        <img alt={name} className="p-2 xl:max-w-xs" src={card} onClick={hidden? handleClickHidden : handleClickRevealed} />
    );
};

export default CardPicker;
