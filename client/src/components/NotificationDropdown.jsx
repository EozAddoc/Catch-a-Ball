import React from 'react';

const NotificationDropdown = ({ notifications, onCloseNotification ,isOpen}) => {
  return (
    <div className={`notification-dropdown ${isOpen ? 'block' : 'hidden'} `}>
    <div className="notification-dropdown absolute top-full right-0 text-blue-700  border-gray-300 shadow-md p-4 w-48">
      {notifications.map((notification, index) => (
        <div key={index} onClick={() => onCloseNotification(index)}>
          <p>{notification}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default NotificationDropdown;
