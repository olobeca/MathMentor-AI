import './App.css';
import React from "react";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ForgetPassword from "./pages/ForgetPassword";
import MadeAccount from "./pages/MadeAccount";
import AdminPannel from "./pages/AdminPannel";
import Premium from "./pages/Premium";
import About from "./pages/About";
import Account from "./pages/Account";
import Knowledge from './pages/Knowledge';


function App() {
  return ( 
    <UserProvider> 
        <div>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route path="/MadeAccount" element={<MadeAccount />} />
                <Route path="/AdminPannel" element={<AdminPannel />} />
                <Route path="/Premium" element={<Premium />} />
                <Route path="/Knowledge" element={<Knowledge />} />
                <Route path="/Account" element={<Account />} />
            </Routes>
        </div>
        </UserProvider>

  );
}
export default App;
