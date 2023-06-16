import Form from "../components/Form";
import React, { useState } from "react";

function LoginPage() {
  return (
    <div className="flex min-h-screen  bg-custom-pokeB">
      <div className="w-2/5 h-30 flex mx-0 relative">
        <img
          src="login_img.jpg"
          alt="loginImg"
          className="opacity-50 w-full h-auto "
        />
      </div>
      <div className="w-3/5  m-5 flex flex-col justify-center items-center">
        <img
          src="l.png"
          className="w-40 h-auto m-5 absolute top-0"
          alt="left button"
        />
       <div className="w-2/3">
          <Form />
        </div>
      </div>
    </div>
  ); 
}

export default LoginPage;
