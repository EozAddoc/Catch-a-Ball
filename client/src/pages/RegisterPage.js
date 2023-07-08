import React from "react";
import Form from "../components/Form";

function RegisterPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1  w-[20%] relative h-screen bg-custom-pokeB">
        <img
          src="register_img.jpg"
          alt="registerImg"
          className="opacity-50 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 w-[80%] bg-custom-pokeB flex flex-col">
        <div className="flex-grow h-[25%]">
          <div className="m-5 flex items-center justify-center">
            <img src="register.png" alt="RegisterImage" />
          </div>
        </div>
        <div className="flex-grow h-[75%] bg-custom-pokeB">
          <Form></Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
