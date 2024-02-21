import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Form = function ({ text, imgSrc, imgAlt, logoAlt, logoSrc }) {
  Axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === "Login") {
      loginF(event);
    } else if (text === "Sign Up") {
      if(validatePassword()){
        registerF(event);
      }else{
        setErrorMessage("Password must be at least 7 characters and contain at least one number and one special character.");
      }
    } else {
      console.log("Error");
    }
  };

  const registerF = (e) => {
    e.preventDefault();
    const url =process.env.REACT_APP_URL+"/signup"
    Axios.post(url, {
      email: email,
      username: username,
      password: password
    })
      .then((resp) => {
        navigate("/signup/pokemon");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.error);
        } else {
          console.error("Error during registration:", error);
        }
      });
  };


  const loginF = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_URL+"/login", {
      username: username,
      password: password,
    }).then((resp) => {
      if (resp.data.message) {
        navigate("/home");
      } else {
        setErrorMessage(resp.data.error)
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error("Error during login:", error);
      }
    });
  };
  const validatePassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    return regex.test(password);
  };
  return (
    <div>
      <div className="min-h-screen md:flex">
        <div className="md:w-1/2 relative bg-custom-pokeB hidden md:block">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="opacity-50 w-full h-full object-cover"
          />
        </div>
        <div className="min-h-screen md:w-1/2 bg-custom-pokeB flex flex-col">
          <div className="md:h-1/2">
            <div className="m-20 flex items-center justify-center">
              <img src={logoSrc} alt={logoAlt} />
            </div>
          </div>
          <div className="md:h-3/4 bg-custom-pokeB">
            <div className="container max-w-md mx-auto xl:max-w-4xl flex rounded-lg overflow-hidden m-30 flex-grow justify-center">
              <div className="md:w-2/4 md:p-20  p-3">
                <form method="post" action="#" onSubmit={handleSubmit}>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <div
                    className="relative mb-6  border-white border bg-transparent"
                    data-te-input-wrapper-init
                  >
                    <input
                      type="text"
                      className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput2"
                      placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {username === "" && (
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                      >
                        Username
                      </label>
                    )}
                  </div>
                  {text === "Sign Up" && (
                    <div
                      className="relative mb-6  border-white border"
                      data-te-input-wrapper-init
                    >
                      <input
                        type="text"
                        className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Email address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      {email === "" && (
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Email address
                        </label>
                      )}
                    </div>
                  )}

                  <div
                    className="relative mb-6 border-white border "
                    data-te-input-wrapper-init
                  >
                    <input
                      type="password"
                      className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="Email address"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    {password === "" && (
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Password
                      </label>
                    )}
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="m-2 mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative text-white float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        value=""
                        id="exampleCheck3"
                       defaultChecked
                      />
                      <label
                        className="text-white inline-block pl-[0.15rem] hover:cursor-pointer"
                       htmlFor="exampleCheck3"
                      >
                        Remember me
                      </label>
                    </div>


                    {text === "Sign Up" && (
                      <a
                        href="#!"
                        onClick={() => navigate("/login")} // Navigate to "/login" when clicked
                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >
                        Already have an account?
                      </a>
                    )}
                    {text === "Login" && (
                      <a
                        href="#!"
                        onClick={() => navigate("/login")} // Navigate to "/login" when clicked
                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >
                        Forgot password
                      </a>
                    )}

                  </div>

                  <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleSubmit}
                  >
                    {text}
                  </button>

                  {/* <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>

                  <button className="bg-blue-900 mb-3 no-underline flex w-full items-center justify-center rounded  px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    Continue with Facebook
                  </button>
                  <button className="bg-blue-400 mb-3 no-underline flex w-full items-center justify-center rounded  px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    Continue with Twitter
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
