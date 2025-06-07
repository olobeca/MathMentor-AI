import React from "react";
import Header from "../components/Header";


function Knowledge() {
    return (
        <div> 
            <Header/>
            <div className=" background-div "> 
                    <div className="welcome-pages-frame-div w-[820px] h-[620px] ">  
                        <h1 className="welcome-h1">Knowledge Base</h1>
                        <div className="w-full mb-5 flex items-center  gap-1">
                            <p className="text-center text-lg">This is a knowledge base page where you can find information about the application, how to use it, and other relevant details.</p>
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default Knowledge;