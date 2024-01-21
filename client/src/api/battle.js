import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_URL;

export const getBattle = async (initialTime) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Battle/filter?time=${initialTime}`
      );
      return response.data[0] || [];
    } catch (error) {
      console.error("Error fetching in-progress data:", error);
      return [];
    }
  };
  export const endBattle = async (id) => {
    console.log(`${BASE_URL}/End`)
    try {
      const response = await axios.patch(`${BASE_URL}/End`, { id: id });
      console.log("res in endBattle: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error ending battle:", error);
      throw error;
    }
    
  };