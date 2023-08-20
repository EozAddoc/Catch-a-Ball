import React from "react";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SignupPokemon from "./SignupPokemon";
import Home from "Home"
import { BrowserRouter, Routes , Route} from "react-router-dom";

function App (){
    return (
        <>
        <BrowserRouter>
        <Route path="/" element={Landing}></Route>
        <Route path="/signup" element={RegisterPage}></Route>
        <Route path="/signup/pokemon" element={SignupPokemon}></Route>
        <Route path="/login" element={LoginPage}></Route>
        <Route path="/home" element={Home}></Route>

        </BrowserRouter>
        </>
    )
}