import React from 'react';

function App() {
  return (
    <div className=".bg-indigo-900 text-center App">
      <header className="bg-blue-1000 min-h-screen flex flex-col items-center justify-center text-white App-header">
        <img src="logo_welcome.png" className="h-40vmin pointer-events-none App-logo" alt="Catch a Ball" />
        <img src="pok3.png" className="w-32 mx-auto mt-4" alt="three pokemons" />
        <div className="mt-4 flex flex-wrap justify-center">
          <img src="register.png" className="w-40 mr-2 mb-2" alt="register" />
          <img src="login.png" className="w-40 ml-2 mb-2" alt="login" />
        </div>
      </header>
    </div>
  );
}

export default App;
