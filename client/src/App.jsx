import './App.css';
import React from "react";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

function App() {
  return ( 
    <UserProvider> 
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </div>
        </UserProvider>

  );
}
export default App;
