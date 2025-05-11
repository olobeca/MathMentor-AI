import './App.css';
import React from "react";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return ( 
    <UserProvider> 
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
            </Routes>
        </div>
        </UserProvider>

  );
}
export default App;
