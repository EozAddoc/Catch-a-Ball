import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_URL;


export const getUser = () => {
  return axios.get(`${BASE_URL}/user`);
};

export const updateUser = (userData) => {
  return axios.post(`${BASE_URL}/Profile`, { updatedUserData: userData });
};
export const updateNotifications = (newNotifications) => {
  console.log('nw not ! ' + JSON.stringify(newNotifications), typeof newNotifications.notifications)
  return axios.post(`${BASE_URL}/Notifications`, {newNotificationData: newNotifications });
};
export const levelUp =  async (userId) => {
  try {
    const response =  await axios.patch(`${BASE_URL}/LevelUp`, { userId: userId });
    console.log("level up ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error leveling up:", error);
  }
};

export const getInProgressData = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/inProgress/filter?q=${userId}`
    );
    return response || [];
  } catch (error) {
    console.error("Error fetching in-progress data:", error);
    return [];
  }
};


export const getOtherUsersData = async (field,value) => {
  console.log("in others," + field, value)
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/filters?field=${field}&value=${value}`
          );
    console.log("other user " + response.data)
    return response.data && response.data.length > 0
      ? response
      : null;
  } catch (error) {
    console.error("Error fetching user names:", error);
    return null;
  }
};

export const getPotentialOpponents = async (userLevel,userId) => {
  console.log("type of", userId, typeof user);
  console.log(`${process.env.REACT_APP_URL}/api/filter?q=${userLevel}&field=battleLvl&userId=${userId}`);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/filter?q=${userLevel}&field=battleLvl&userId=${userId}`
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