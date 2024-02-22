import Card from "./Card";

const Menu = ({ setMenuSelected }) => {
    const setMenu = (text) => {
        setMenuSelected(text);
    }

  return (
    <div className="relative left-[-35%] md:left-[-15%] lg:left-[-5%] mt-10">
      <div className="absolute left-3 z-0 rotate-[-12deg]">
        <Card text={"team"} setMenu={setMenu}/>
      </div>
      <div className="absolute z-10 left-10">
        <Card text={"trainer"} setMenu={setMenu} />
      </div>
      <div className="absolute z-20 left-20 rotate-12">
        <Card text={"missions"} setMenu={setMenu}/>
      </div>
    </div>
  );
};

export default Menu;
