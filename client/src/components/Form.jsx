import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

const Form = function ({ text, imgSrc, imgAlt, logoAlt, logoSrc }) {
  Axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [verifiedPassword, setVerifiedPassword] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === "Login") {
      loginF(event);
    } else if (text === "Sign Up") {
      if(validatePassword()){
        if(verifyPassword()){
          if(isValidEmail()){
            registerF(event);
          }
        }else{
        setErrorMessage("Password must be at least 7 characters and contain at least one number and one special character.");
      }
    } }else if (text === "Send Email") {
sendEmail(event)
    }else if (text === "Reset Password") {
      
      if(validatePassword){
        if(verifyPassword){
          const searchParams = new URLSearchParams(window.location.search);
          const token = searchParams.get('me2eg8p');
          const decodedTokenId = jwtDecode(token).id;
          resetPassword(decodedTokenId)
        }
      }
    } else {
      console.error("Error");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const url =process.env.REACT_APP_URL+"/api/send"
    Axios.post(url, {
      email: email
    })
      .then((resp) => {
       alert("Email sent check your emails to reset your password")
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage(error.response.data.error);
        } else {
          console.error("Error sending email:", error);
        }
      });
  };
   const resetPassword = (decodedTokenId) => {
    const updatedUserData = {
      id: decodedTokenId,
      password: password
    };
    const url =process.env.REACT_APP_URL+"/Profile"
    Axios.post(url, {
      updatedUserData: updatedUserData,
    })
      .then((resp) => {
        alert("password updated successfully")
       navigate("/login")
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.error);
        } else {
          alert("password updated successfully")
          navigate("/login")
        }
      });
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

  const verifyPassword=()=>{
    if(verifiedPassword !== password){
      setPasswordMatch(false)
setErrorMessage("Passwords do not match")
    }else{
      setPasswordMatch(true)
        }
       return verifiedPassword === password 
  }

  const isValidEmail= () =>{
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:gmail\.com|yahoo\.fr|hotmail\.com|wanadoo\.fr|outlook\.com)$/;  
    if(!(emailRegex.test(email))){
      setValidEmail(false)
setErrorMessage("Provide a valid email")
    }else{
      setValidEmail(true)
    }
    return emailRegex.test(email)
  }
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
                  {(text !== "Send Email" && text !== "Reset Password") && (  <div
                    className="relative mb-6  border-white border bg-transparent"
                    data-te-input-wrapper-init
                  >
                    <input
                      type="text"
                      className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {username === "" && (
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                      >
                        Username
                      </label>
                    )}
                  </div>
                  )}
                  {(text === "Sign Up"|| text === "Send Email") && (
                    <div
                      className="relative mb-6  border-white border"
                      data-te-input-wrapper-init
                    >
                      <input
                        type="email"
                        className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      {email === "" && (
                        <label
                          htmlFor="exampleFormControlInput2"
                          className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                          Email
                        </label>
                      )}
                    </div>
                  )}
  { text !== "Send Email" && (
                  <div
                    className="relative mb-6 border-white border "
                    data-te-input-wrapper-init
                  >
                    <input
                      type="password"
                      className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    {password === "" && (
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                         {text === "Reset Password" ? "New Password" : "Password"}
                      </label>
                    )}
                  </div>
  )}
    { (text !== "Send Email" && text !=="Login") && (
                  <div
                    className="relative mb-6 border-white border "
                    data-te-input-wrapper-init
                  >
                    <input
                      type="password"
                      className="text-white font-bold bg-blue-800 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="verification password"
                      onChange={(e) => {
                        setVerifiedPassword(e.target.value);
                      }}
                    />
                    {password === "" && (
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Confirm Password
                      </label>
                    )}
                  </div>
    )}
                  <div className="mb-6 flex items-center justify-between">
                   


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
                        onClick={() => navigate("/SendEmail")} // Navigate to "/login" when clicked
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
