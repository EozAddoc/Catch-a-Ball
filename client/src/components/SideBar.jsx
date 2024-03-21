import React, { useState, useEffect, useRef }from 'react';
import List from './Menu/List';
import notificationIcon from './notificationIcon.png'
import NotificationDropdown from './NotificationDropdown';
import { getUser, getOtherUsersData, updateNotifications} from "../api/user";
import { jwtDecode } from "jwt-decode";
import jsCookie from "js-cookie"
import withDarkMode from './withDarkMode';

const Sidebar = ({notification,darkMode,toggleTheme}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [id, setId] = useState()
  const ref = useRef(null);

  useEffect(() => {
    const token = jsCookie.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setId(decodedToken.userId)
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
    const fetchData = async () => {
      try {
        const userResponse = await getUser();

        if (userResponse.data.Status === "Success") {
          const notificationsMap = JSON.parse(userResponse.data.userData.notifications)

          const mappedNotifications = notificationsMap.map((item) => item);
          setNotifications(notificationsMap)

        }} catch (err) {
          console.error("error", err);
        }}
    
    fetchData()
  }, []);
 
  useEffect(() => {
    if (notification) {
     const updatedNotifications = setNotifications((prevNotifications) => [...prevNotifications, notification]);
     const newNotificationsData = {}
     newNotificationsData.id = id;
     newNotificationsData.notifications = updatedNotifications;
     updateNotifications(newNotificationsData)
     setNotifications(updatedNotifications)
    }
  }, [id,notification]);

  const onCloseNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    const newNotificationsData = {}
    newNotificationsData.id = id;
    newNotificationsData.notifications = updatedNotifications;
    updateNotifications(newNotificationsData)
    setNotifications(updatedNotifications)
  };
  const toggleNotifications = () => {
    console.log(notificationIcon)
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setShowSidebar(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [ref]);

  return (
    <div ref={ref}>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed z-30 flex items-center cursor-pointer left-10 top-6"
          fill="#FFFFFF"
          key="menu-icon"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      {/* Notification icon on top right */}
    

      <div
        className={`top-0 left-0 w-full md:w-[40vw] lg:w-[30vw] bg-yellow-500 md:p-10 xl:pl-20 text-white fixed min-h-screen xl:h-full z-40 ease-in-out duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className={`absolute ${notifications.length > 0  ? 'animate-bounce' : ''} top-2 right-2 p-2`}>        <img
          src={notificationIcon}
          alt="Notification icon"
          className="h-8 cursor-pointer"
          onClick={toggleNotifications}
        />
              <NotificationDropdown notifications={notifications} onCloseNotification={onCloseNotification} isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      </div>
        <h3 className="mt-[30px]  text-4xl font-semibold text-white">
          <List />
        </h3>
      </div>
    </div>
  );
};

export default withDarkMode(Sidebar);
