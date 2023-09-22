const MenuIcon = ({ children, width, height }) => {

    return (
        <svg className="mx-4" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            {children}
        </svg>
    )
}
export default MenuIcon;