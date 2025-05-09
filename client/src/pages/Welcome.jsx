import './App.css';
import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';


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


  return ( 
    <div className=" entry-page-color h-screen justify-center  items-center flex"> 
    
    <div className=" flex-col  justify-center items-center border-none py-8 px-8 rounded-lg shadow-lg  bg-white">
      <h1 className="entry-page-color bg-clip-text text-5xl font-extrabold text-transparent text-center mb-6">Welcome</h1>
      <div className="w-full mb-5 flex items-center justify-between gap-4">
        <input onChange={handleEmailChange} placeholder='example@email.com'></input>
        <label className=" font-bold  ">Enter your email</label>
      </div> 
      <div className="flex items-center mb-5 justify-between gap-4">
        <input onChange={handlePasswordChange} placeholder="password"></input>
        <label className=" font-bold">Enter your password</label>
      </div> 
      <div className="mb-5 flex items-center justify-between gap-4">
        <a href="http://localhost:3000/ForgetPassword" className="text-gray-500">forget password</a> 
        <button type="submit" className="w-full entry-page-color rounded-md text-white px-4 py-2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600">login</button>
      </div> 
      <div className="mb-5 flex items-center justify-between gap-4 ">
        <a className="text-gray-500">Don't have an account?</a>
        <button className='entry-page-color hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-900 rounded-md text-white  py-2 px-20'>Sign Up</button> 
      </div>
    </div>
    </div>
  );
}

export default Welcome;
