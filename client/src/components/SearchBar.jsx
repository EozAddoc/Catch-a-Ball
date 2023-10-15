import { useNavigate } from "react-router-dom";


const SearchBar = () =>{
  const navigate = useNavigate();
const search = (e)=>{
  navigate("/Search")
}
    return (
        <form>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white ">
          Search

        </label>
        
        <div className="relative bg-transparent-500 h-15  rounded-full">

        <input
type="search"
id="default-search"
className="bg-white w-full p-3 pl-10 text-lg  rounded-full opacity-50 outline-none "
placeholder="Search For Adversaries"
required
/>


          <button
            type="submit"
            className="text-white absolute ml-6 opacity-100  "
            onClick={search}
          >
            <img
            src="se.png"
            alt="search_btn"
            className="ml-6 w-full h-auto">
            </img>
            Search
          </button>
        </div>
      </form>
    )
}
export default SearchBar;