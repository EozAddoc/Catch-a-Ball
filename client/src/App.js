import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <Router>
      <div className="bg-indigo-950 text-center App">
        <header className="bg-blue min-h-screen flex flex-col items-center justify-center ">
        <img src="logo_welcome.png" className="w-1/2 sm:w-2/3 md:w-3/4 lg:w-2/3 mx-auto mt-auto  top-0 left-0 right-0" alt="Catch a Ball" />          
        <img src="pok3.png" className="w-128 mx-auto mt-10" alt="three pokemons" />
          <div className="mt-1 flex flex-wrap justify-center">
            <Link to="/register" className="bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded mr-4 mb-4">
              <img src="register.png" className="w-25" alt="register" />
            </Link>
            <button className="bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded ml-4 mb-4">
              <img src="login.png" className="w-20" alt="login" />
            </button>
          </div>
        </header>
      </div>

    </Router>
  );
}


export default App;
