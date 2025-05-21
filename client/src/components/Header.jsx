import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Header() {

    const {user} = useUser();

    return (
        <header class="sticky top-0  entry-page-color text-black py-2 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                
                <nav className="space-x-4">
                    <Link className="header-link" to="/Home">Home</Link> 
                    <Link className="header-link" to="/Premium">Premium</Link> 
                    <Link className= "header-link" to="/">Login</Link> 
                </nav>
                
                <img src="/pictures/logo.jpg" alt="logo" className="w-1/6 h-1/6"/>

                <nav className="space-x-4">
                    <Link className="header-link" to="/Account">Account</Link> 
                    {user.isAdmin ? <Link className= "header-link" to="/AdminPannel">Admin Pannel</Link> : null}
                    <Link className="header-link" to="/About">About</Link> 
                </nav>
            </div>

        </header>
    );

} 
export default Header;