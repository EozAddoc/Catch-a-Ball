import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from './pages/Landing';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TestApi from './pages/TestApi';

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
    path: "test-api",
    element: <TestApi />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
