import React from 'react';
import Sidebar from '../components/SideBar'
import Searchbar from '../components/SearchBar'
import { useNavigate, useLocation } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults = location.state ? location.state.searchResults : [];

  function getRandomColor(index) {
    const colors = ['#D70F0F', '#299917', '#9036AF', '#0909F9'];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  }

  const Battle = (userId) => {
    navigate(`/Opponent/${userId}`);
  };


  return (
    <div className="bg-blue-950">
      <div className="bg-townNN bg-cover h-screen flex flex-col items-center justify-center">
        <div className="search w-3/5 ml-10 fixed top-24 ">
          {/* Don't forget to pass searchResults as a prop to SearchBar */}
          <Searchbar searchResults={searchResults} />
        </div>
        <div className="w-3/5 ml-30 mt-36 bg-transparent">
          <h2 className="text-white font-bold justify-center text-center m-10 ">
            {searchResults.length}&nbsp; R E S U L T S :{' '}
          </h2>
          <div className="w-full">
            {searchResults.map((result, index) => (
              <div key={index} className="flex w-full">
                <div
                  style={{ backgroundColor: getRandomColor(index), letterSpacing: '0.2em' }}
                  className="rounded-full  relative p-1 m-10  w-full h-14 flex text-white font-semibold mt-3 tracking-wide"
                >
                  <div className="flex-1">
                    <div className="bg-white ml-2 rounded-full w-12 h-12">
                      {/* Content of the circular div */}
                    </div>
                  </div>
                  <div className="flex-1 mt-3">
                    <p>{result.username}</p>
                  </div>
                  <div className="flex-1 text-white font-semibold mt-3 w-1/6 tracking-wide">
                    L V L {result.lvl}
                  </div>
                </div>
                <div className="bg-yellow-300 text-center font-bold text-xl rounded-full ml-10 mt-10 ">
                  <div className="m-2">
                  <button onClick={() => Battle(result.id)}>
                                          <p className="m-3">B A T T L E</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Search;
