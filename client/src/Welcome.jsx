import './App.css';
import React from "react";
function Welcome() {
  return ( 
    <div className=" entry-page-color h-screen justify-center  items-center flex"> 
    <div className=" flex-col  justify-center items-center border-none py-8 px-8 rounded-lg shadow-lg  bg-white">
      <h1 className="entry-page-color bg-clip-text text-5xl font-extrabold text-transparent">Welcome</h1>
      <div className="w-full mb-5">
        <input placeholder='lalala'></input>
        <label className="text-2xl font-bold text-center ">Enter your email</label>
      </div> 
      <div className="w-full mb-5">
        <input></input>
        <label className="text-2xl font-bold">Enter your password</label>
      </div>


    
    </div>
    </div>
  );
}

export default Welcome;
