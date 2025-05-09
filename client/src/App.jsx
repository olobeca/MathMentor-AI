import logo from './logo.svg';
import './App.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import {useState} from "react";
import Home from "./Home";
import Welcome from "./Welcome";

function App() {
  return ( 
    <Welcome />

  );
}
export default App;
