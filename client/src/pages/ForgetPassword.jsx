import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';


function ForgetPassword() {


    return (
        <>
        <div className=" background-div "> 
        <div className="welcome-pages-frame-div"> 
            <h1 className="welcome-h1">Reset password</h1>
            <div className="welcome-button-div"> 
                <input placeholder='example@email.com'></input>
                <label className=" font-bold  ">Enter your email</label>
            </div>
            <div className="welcome-button-div"> 
                <button type="submit" className="w-full entry-page-color rounded-md text-white px-4 py-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600">Send an Email</button>
            </div>
        </div>
        </div>
        </>
    )
} 

export default ForgetPassword;
