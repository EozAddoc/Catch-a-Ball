import MenuLink from './MenuLink';

import MenuIcon from './Icons/MenuIcon'
import HomeIcon from './Icons/HomeIcon';
import ProfileIcon from './Icons/ProfileIcon';
import DeckIcon from './Icons/DeckIcon';

const List = () => {
    const listOfLinks = [
        { name: "Home", width: "50", height: "48", icon: <HomeIcon /> },
        { name: "Profile", width: "50", height: "50", icon: <ProfileIcon /> },
        { name: "Deck", width: "66", height: "57", icon: <DeckIcon /> },
        { name: "Logout", width: "66", height: "57", icon: <DeckIcon /> }
    ];
    let listOfElements = [];

    for (let i in listOfLinks) {
        listOfElements.push(
            <MenuLink name={listOfLinks[i].name}>
                <MenuIcon width={listOfLinks[i].width} height={listOfLinks[i].height} >
                    {listOfLinks[i].icon}
                </MenuIcon>
            </MenuLink>
        )
    };

    return (
        <ul className='text-4xl md:text-5xl lg:text-3xl text-blue-500 px-0 py-0 md:leading-10 my-0'>
            {listOfElements}
        </ul>
    )
}

export default List;