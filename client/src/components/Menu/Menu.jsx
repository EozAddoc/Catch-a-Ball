import { useState } from 'react';

import List from './List';

const Menu = () => {
    const [menuOpened, setMenuOpened] = useState(false);

    const clickOnMenu = () => {
        menuOpened ? setMenuOpened(false) : setMenuOpened(true);

        // const element = document.getElementById('menu');
        // element.classList.remove('animate-menuOpened');
        // element.classList.add('animate-menu');
    }

    return (
        <div >
      
            <img onClick={clickOnMenu} alt="logo" className='h-16' src='logo192.png'/>
            <div id="menu" className={menuOpened ? 'animate-menuOpened text-menuBlue bg-amber-400 w-1/5 transition duration-300 rounded-r-lg'
                : 'absolute -left-5 transition rotate-6 right-50 w-10 h-96 bg-amber-400 rounded-r-lg'}>
                {menuOpened && <List />}
            </div>
        </div>
    )
}

export default Menu;