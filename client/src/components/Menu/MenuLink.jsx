import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const MenuLink = ({ children, name }) => {
    return (
        <li className='py-7' key={name}>
            <Link to={'/' + name} className="no-underline text-black flex">
            {children}
            {name}
            </Link>
        </li>
    )
}

export default MenuLink;