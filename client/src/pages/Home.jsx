import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react"; 
import '../App.css';
import { useUser } from '../context/UserContext';
import Header from "../components/Header";



function Home() {

    const {user}= useUser();
    console.log("user in home page", user);


    return ( 
        <div> 
            <Header/>
            <div className=" background-div "> 
                <div className="flex flex-col items-center justify-center h-screen px-4 gap-2">
                    <h1 className= "bg-gradient-to-r from-blue-500 to-green-500 text-5xl bg-clip-text font-extrabold text-transparent text-center">This is Home Page </h1> 
                    <div className="flex flex-row items-center justify-center h-screen px-4 gap-10"> 
                        <div className="welcome-pages-frame-div w-[600px] h-[600px] ">  
                            <p className="chatbot-message">Hello i am MathMentor how can i help u?</p>
                            
                        </div>
                        <div className="welcome-pages-frame-div w-[600px] h-[600px]">
                            <h1>Hello {user.email} </h1> 
                            <h2>Welcome to MathMentor-AI</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;