import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';


function MadeAccount() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    }); 

    function handleEmailChange(e){
    setUser({...user, email: e.target.value}); 
   }

    function handlePasswordChange(e){
        setUser({...user, password: e.target.value}); 
    }

    function handleAddUser() {
        console.log("date sent to server", user);
        fetch("http://localhost:5001/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        }); 
        setUser({
            email: "",
            password: "",
        }); 
    }



    return (
        <>
        <div className=" background-div "> 
        <div className="welcome-pages-frame-div"> 
            <h1 className="welcome-h1">Made an Account</h1>
            <div className="welcome-button-div"> 
                <input value={user.email} onChange={handleEmailChange} placeholder='example@email.com'></input>
                <label className=" font-bold  ">Enter your email</label>
            </div>
            <div className="welcome-button-div"> 
                <input value={user.password} onChange={handlePasswordChange} placeholder='password'></input>
                <label className=" font-bold  ">Enter your password</label>
            </div>
            <div className="welcome-button-div"> 
                <button type="submit" onClick={handleAddUser} className="w-full entry-page-color rounded-md text-white px-4 py-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600">Made an account</button>
            </div>
        </div>
        </div>
        </>
    )
} 

export default MadeAccount;
