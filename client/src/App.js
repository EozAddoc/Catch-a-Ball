import React from "react";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SignupPokemon from "./pages/SignupPokemon";
import Home from "Home"
import { BrowserRouter, Routes , Route} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
function App (){
    return (
        <>
        <ThemeProvider>
        <BrowserRouter>
        <Route path="/" element={Landing}></Route>
        <Route path="/signup" element={RegisterPage}></Route>
        <Route path="/signup/pokemon" element={SignupPokemon}></Route>
        <Route path="/login" element={LoginPage}></Route>
        <Route path="/home" element={Home}></Route>
        </BrowserRouter>
        </ThemeProvider>
        </>
    )
}
export default App;