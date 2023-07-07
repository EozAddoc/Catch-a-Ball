import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react';
import CardPicker from '../components/CardPicker';

function TestApi() {
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
 
        console.log('count')

        apiIds.map(id => console.log(id))

        for (let i in apiIds) {
            console.log("test", i)
            pokemon.card.find(apiIds[i])
                .then(card => {
                    if (!cards.includes(card)) {
                        setCards(cards => [...cards, card])
                        // console.log("test", i)
                    }
                });
        }
    }, []); // empty array for useEffect so it only renders once

    let cardImgs = [];

    for (let i in cards) {
        // console.log(cards)
        cardImgs.push(<CardPicker cardImg={cards[i].images?.large ?? "pkmn-cardback.png"} />)
    }

    return (
        <div class="flex">
            {cardImgs}
        </div>
    )
}

export default TestApi;