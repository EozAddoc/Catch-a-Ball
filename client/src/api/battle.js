import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_URL;

export const getBattle = async (initialTime) => {
  const url = `${BASE_URL}/Battle/filter?time=${initialTime}`;

  try {
    const response = await axios.get(url);
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching battle data from ${url}:`, error);
    return null;
  }
};

export const endBattle = async (battleId) => {
  console.log(`${BASE_URL}/End`);
  console.log("battle id " + battleId);
  try {
    const response = await axios.patch(`${BASE_URL}/End`, {
      battleId: battleId,
    });
    console.log("res in endBattle: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error ending battle:", error);
    throw error;
  }
};
