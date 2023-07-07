import React from "react";
import Button from "./Button";
const Form = function () {
  return (
      <form class="  bg-white ">
        <div class="flex flex-col items-center p-3">
          <div class="mb-4">
            <input
              class="p-2  rounded w-full py-2 px-3 text-gray-700 leading-tight border border-black"
              id="email"
              type="Email"
              placeholder="Email address"
            />
          </div>
          <div class="mb-6 flex flex-col">
            <input
              class="p-2  border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight border border-black"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex m-2 items-center">
            <input
              className="flex text-black"
              type="checkbox"
              value=""
              id="box"
            />
            <label
              className="inline-block font-900 text-black m-1"
              htmlFor="exampleCheck3"
            >
              Remember me
            </label>
          </div>

        <a
          className=" m-2 inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
          href=""
          style={{ textDecoration: "none" }}
        >
          Forgot Password?
        </a>
      </div>
      <Button name="Sign In" />
      <div className="flex items-center justify-center mt-4">
        <div className="w-1/3 border border-gray-300 mr-2"></div>
        <span className="text-gray-500">OR</span>
        <div className="w-1/3 border border-gray-300 ml-2"></div>
      </div>
      <Button class="bg-red-500" name="Sign In" />
    </form>
  );
};

export default Form;
