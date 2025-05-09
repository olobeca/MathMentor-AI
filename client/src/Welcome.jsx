import './App.css';
import React from "react";
function Welcome() {
  return ( 
    <div className=" entry-page-color h-screen justify-center  items-center flex"> 
    
    <div className=" flex-col  justify-center items-center border-none py-8 px-8 rounded-lg shadow-lg  bg-white">
      <h1 className="entry-page-color bg-clip-text text-5xl font-extrabold text-transparent text-center">Welcome</h1>
      <div className="w-full mb-5 flex items-center justify-between gap-4">
        <input placeholder='example@email.com'></input>
        <label className=" font-bold  ">Enter your email</label>
      </div> 
      <div className="flex items-center mb-5 justify-between gap-4">
        <input placeholder="password"></input>
        <label className=" font-bold">Enter your password</label>
      </div> 
      <div className="mb-5 flex items-center justify-between gap-4">
        <a href="#">forget password</a> 
        <button type="submit" className="w-full entry-page-color rounded-md text-white px-4 py-2">login</button>
      </div>

    </div>


    </div>
  );
}

export default Welcome;
