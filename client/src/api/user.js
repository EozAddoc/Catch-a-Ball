import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_URL;

export const getUser = () => {
  return axios.get(`${BASE_URL}/user`);
};

export const updateUser = (userData) => {
  return axios.post(`${BASE_URL}/Profile`, { updatedUserData: userData });
};

export const getInProgressData = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/inProgress/filter?q=${userId}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching in-progress data:", error);
    return [];
  }
};

export const getOtherUsersData = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/filter?q=${id}`
    );
    return response.data && response.data.length > 0
      ? response.data
      : null;
  } catch (error) {
    console.error("Error fetching user names:", error);
    return null;
  }
};

export const getPotentialOpponents = async (userLevel) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/filter?q=${userLevel}&field=lvl`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching potential opponents:", error);
    return [];
  }
}
export const filterUsers = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/search?q=${searchTerm}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching potential opponents:", error);
    return [];
  }
}