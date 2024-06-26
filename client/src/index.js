import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';

import Landing from './pages/Landing';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SignupPokemon from './pages/SignupPokemon';
import SignupAvatar from './pages/SignupAvatar';
import Home from './pages/Home'
import Search from './pages/Search';
import Arena from './pages/Arena'
import SendEmail from './pages/SendEmail'
import ResetPassword from './pages/ResetPassword'
import Opponent from './pages/Opponent';
import Battle from './pages/Battle';
import Logout from './pages/Logout';
import Deck from './pages/Deck';
import ProfilePage from './pages/ProfilePage';
import MyCarousel from './pages/MyCarousel';
import LoadingPage from './LoadingPage';
import PrivateRoutes from './PrivateRoutes';
import ToggleMode from './components/ToggleButton'
import axios from "axios";
axios.defaults.withCredentials = true;

// Function to set the token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
window.addEventListener("beforeunload", function(event) {
  localStorage.removeItem('token');

  setAuthToken(null);

 localStorage.clear();
});
const router = createBrowserRouter([
  {
    path: "",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "SendEmail",
    element: <SendEmail />,
    errorElement: <ErrorPage />
  },
  {
    path: "ResetPassword",
    element: <ResetPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: "Profile",
    element: <PrivateRoutes element={<ProfilePage />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "Search",
    element: <PrivateRoutes element={<Search />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "Arena",
    element: <PrivateRoutes element={<Arena />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "Opponent/:userId",
    element: <PrivateRoutes  element={<Opponent />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "Battle/:userId/:time",
    element: <PrivateRoutes element={<Battle />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "logout",
    element: <Logout />,
    errorElement: <ErrorPage />
  },
  {
    path: "Deck",
    element: <PrivateRoutes element={<Deck />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "home",
    element: <PrivateRoutes  element={<Home />} />,
    errorElement: <ErrorPage />
  },
  {
    path: "signup/pokemon",
    element: <PrivateRoutes element={<SignupPokemon />}></PrivateRoutes>,
    errorElement: <ErrorPage />
  },
  {
    path: "signup/avatar",
    element:<PrivateRoutes element={<SignupAvatar />}></PrivateRoutes> ,
    errorElement: <ErrorPage />
  }
  ,
  // {
  //   path: "myCarousel",
  //   element: <MyCarousel />,
  //   errorElement: <ErrorPage />
  // } ,
  {
    path: "Loading",
    element: <LoadingPage />,
    errorElement: <ErrorPage />
  } ,
  {
    path: "Error",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

   <RouterProvider router={router} /> 
 
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
