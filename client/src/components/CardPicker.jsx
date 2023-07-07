import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';

function CardPicker({ cardImg }) {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const [card, setCard] = useState("pkmn-cardback.png");
    // const [cardPicked, setCardPicked] = useState(false);

    // useEffect(() => {
    //     setCard(cardImg)
    // }, [cardPicked])

    return (
        <div>
            <img src={card} onClick={() => {
                setCard(cardImg);
            }} />
        </div>
    )
}

export default CardPicker;