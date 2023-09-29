import React from "react";

function ProfilePage() {
  return (
    <div className="bg-transparent rounded-lg shadow-md w-96">
      <img
        src="register_img.jpg" // Replace with your image URL
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-[-30px]"
      />
      <div className="bg-yellow-400 flex flex-col items-center">
        <h4 className="pt-8 pb-2">LVL 1</h4>
      </div>
      <div className="bg-gray-200 p-2">
        <div className="mb-4 flex items-center">
          <label htmlFor="username" className="p-2 block font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="email" className="p-2 block font-medium text-gray-700">
            Mail:
          </label>
          <input
            type="text"
            placeholder="Mail"
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6 flex items-center">
          <label htmlFor="password" className="p-2 block font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
