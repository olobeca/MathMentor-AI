import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react"; 
import '../App.css';


function Home() {

    return (
        <div className=" background-div "> 
            <div className="flex flex-row items-center justify-center h-screen px-4 gap-10">            
                <div className="welcome-pages-frame-div w-96 h-96">  
                    <h1>This is Home Page </h1> 
                    <h2>Welcome to MathMentor-AI</h2>
                </div>
                <div className="welcome-pages-frame-div w-96 h-96">
                    <h1>This is Home Page </h1> 
                    <h2>Welcome to MathMentor-AI</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;