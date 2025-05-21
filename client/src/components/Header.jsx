import React from "react";
import { Link } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

function Header() {

    const {user} = UserProvider();
    
    return (
        <header class="sticky top-0  header-color text-black py-8 shadow-md">
            <div className="container mx-auto px-4 flex justify-center items-center">
                <h1 className="text-white text-4xl font-bold">Math Mentor AI</h1> 
                {user.isAdmin ?   
                    <div>

                    </div> :    
                    
                    <div>
                    
                    </div>}
            </div>

        </header>
    );

} 
export default Header;