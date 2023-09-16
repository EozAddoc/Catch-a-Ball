import MenuIcon from './MenuIcon';
import MenuLink from './MenuLink';

import HomeIcon from './HomeIcon';
import ProfileIcon from './ProfileIcon';
import DeckIcon from './DeckIcon';

const List = () => {
    const listOfLinks = [
        { name: "Home", width: "50", height: "48", icon: <HomeIcon /> },
        { name: "Profile", width: "50", height: "50", icon: <ProfileIcon /> },
        { name: "Deck", width: "66", height: "57", icon: <DeckIcon /> }
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
        <ul className='font-bold text-3xl text-menu-blue items-center px-0 leading-10 my-0'>
            {listOfElements}
        </ul>
    )
}

export default List;