import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
 

    const fetchData = async () => {
      try {
        const url = `http://${process.env.REACT_APP_URL}:1117/api/search?q=${searchTerm}`;

        const response = await axios.get(url);

        // Handle the response data
        if (response.data) {
          console.log("Search successful:", response.data);

          const data = response.data; // Use response.data directly

          navigate("/Search", { state: { searchResults: data } });
        } else {
          console.log("Search failed:", response.data.err);
        }
      } catch (error) {
        console.error("Axios Error:", error);
        console.error("Error Response:", error.response); // Log the response for more details
        console.error("Request Config:", error.config); // Log the request configuration
      }
    };

    // Fetch data only when searchTerm changes
    if (searchTerm && searchTerm.trim() !== "") {
      fetchData();
    }
  }, [searchTerm, navigate]); // Dependency array to re-run effect when searchTerm or navigate changes

  const handleSearch = (e) => {
    e.preventDefault();
    // setSearchTerm will trigger the useEffect to fetch data
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white">
        Search
      </label>

      <div className="relative bg-transparent-500 h-15 rounded-full">
        <input
          type="text"
          id="default-search"
          className="bg-white w-full p-3 pl-10 text-lg rounded-full opacity-50 outline-none"
          placeholder="Search For Adversaries"
          value={searchTerm}
          onChange={handleSearch} // Use handleSearch directly in onChange
          required
        />

        <button
          type="submit"
          className="text-white absolute ml-6 opacity-100"
        >
          <img
            src="se.png"
            alt="search_btn"
            className="ml-6 w-full h-auto"
          />
          Search 
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
