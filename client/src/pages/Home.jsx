import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react"; 
import '../App.css';
import { useUser } from '../context/UserContext';
import Header from "../components/Header";
import { createElement } from "react"; //tutaj dodwac p w chato



function Home() {

    const {user}= useUser();
    console.log("user in home page", user);

    const [messages,setMessages] = useState([
       {text: "Hello i am MathMentor how can i help u?", from: "bot"},
       {text: "I can help you with math problems, explanations, and more!", from: "bot"},
    ])

    const [message, setMessage] = useState({text: ""});

    function handleMessageChange(e){
        setMessage({...message,text: e.target.value}); 
        } 
    

   function chatbotMessageSend() {
        console.log("test test tees")
        setMessages(e => [...e, { text: message.text, from: "user" }]);
        setMessage({ text: "" });


   }
   


    return ( 
        <div> 
            <Header/>
            <div className=" background-div "> 
                <div className="flex flex-col items-center justify-center h-screen px-4 gap-2">
                    <h1 className= "bg-gradient-to-r from-blue-500 to-green-500 text-5xl bg-clip-text font-extrabold text-transparent text-center">This is Home Page </h1> 
                    <div className="flex flex-row items-center justify-center h-screen px-4 gap-10"> 
                        <div className="flex gap-y-2 flex-col overflow-y-auto  justify-center items-center border-none py-4 px-8 rounded-lg shadow-lg  bg-white w-[600px] h-[600px] justify-between">  
                            {messages.map((message1, index) => (
                                <p key={index} className={message1.from === "bot" ? "chatbot-message" : "chatbot-message-user"}>{message1.text}</p>
                            ))}
                            
                            <input type="text" 
                                    value={message.text} 
                                    onChange={handleMessageChange} 
                                    onKeyDown={(e) => {
                                                        if (e.key==="Enter") {
                                                            chatbotMessageSend()
                                                        }
                                                    }} className="chatbot-input" placeholder="Type your message here..." />
                        </div>
                        <div className="welcome-pages-frame-div w-[600px] h-[600px]">
                            <h1>Hello {user.email} </h1> 
                            <h2>Welcome to MathMentor-AI</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;