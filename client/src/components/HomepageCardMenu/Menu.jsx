import Card from "./Card";

const Menu = ({ setMenuSelected }) => {
    const setMenu = (text) => {
        setMenuSelected(text);
    }

  return (
    <div class="absolute right-1/3 top-2/4">
      <div class="absolute left-3 z-0 rotate-[-12deg]">
        <Card text={"team"} setMenu={setMenu}/>
      </div>
      <div class="absolute z-10 left-10">
        <Card text={"trainer"} setMenu={setMenu} />
      </div>
      <div class="absolute z-20 left-20 rotate-12">
        <Card text={"missions"} setMenu={setMenu}/>
      </div>
    </div>
  );
};

export default Menu;
