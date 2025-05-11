import './App.css';
import React from "react";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ForgetPassword from "./pages/ForgetPassword";
import MadeAccount from "./pages/MadeAccount";

function App() {
  return ( 
    <UserProvider> 
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route path="/MadeAccount" element={<MadeAccount />} />
            </Routes>
        </div>
        </UserProvider>

  );
}
export default App;
