import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import '../App.css';

function Welcome() {

  const { user: contextUser, setUser: setContextUser } = useUser()  

   const [user, setUser] = useState({
      email: "",
      password: ""  
    });

  function handleEmailChange(e){
    setUser({...user, email: e.target.value}); 
  }

  function handlePasswordChange(e){
    setUser({...user, password: e.target.value}); 
  } 
  const [isPasswordOK, setisPasswordOK] = useState(true);

  function handleLogin() {  
    console.log("date sent to server", user);
        fetch("http://localhost:5001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log("Success:", data); 
            if (data.message === 'Login successful') {
                setisPasswordOK(true);
                //debug
                console.log (user.email);
                console.log(user.password);
                setContextUser(user);
                window.location.href = "http://localhost:3000/Home"; 
            } else {
                setisPasswordOK(false);
            }
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
    <div className=" background-div "> 
    
    <div className="welcome-pages-frame-div">
      <h1 className="welcome-h1">Welcome</h1>
      <div className="w-full mb-5 flex items-center justify-between gap-4">
        <input onChange={handleEmailChange} placeholder='example@email.com'></input>
        <label className=" font-bold  ">Enter your email</label>
      </div> 
      <div className="flex items-center mb-5 justify-between gap-4">
        <input onChange={handlePasswordChange} placeholder="password"></input>
        <label className=" font-bold">Enter your password</label>
      </div> 
      <div className="welcome-button-div">
        <a href="http://localhost:3000/ForgetPassword" className="text-gray-500">forget password</a> 
        <button onClick={handleLogin} type="submit" className="w-full entry-page-color rounded-md text-white px-4 py-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600">login</button>
      </div> 
      <div className="welcome-button-div">
        <a href="http://localhost:3000/MadeAccount"><button className='w-full entry-page-color hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-900 rounded-md text-white  py-2 px-20'>Sign Up</button></a> 
      </div> 
      {!isPasswordOK && (
        <div className="welcome-button-div">
          <p className="text-red-500">Wrong Email or password</p>
        </div>
      )}
       
    </div>
    </div>
  );
}

export default Welcome;
