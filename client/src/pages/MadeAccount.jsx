import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';


function MadeAccount() {


    return (
        <>
        <div className=" background-div "> 
        <div className="welcome-pages-frame-div"> 
            <h1 className="welcome-h1">Made an Account</h1>
            <div className="welcome-button-div"> 
                <input placeholder='example@email.com'></input>
                <label className=" font-bold  ">Enter your email</label>
            </div>
            <div className="welcome-button-div"> 
                <input placeholder='password'></input>
                <label className=" font-bold  ">Enter your password</label>
            </div>
            <div className="welcome-button-div"> 
                <button type="submit" className="w-full entry-page-color rounded-md text-white px-4 py-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600">Made an account</button>
            </div>
        </div>
        </div>
        </>
    )
} 

export default MadeAccount;
