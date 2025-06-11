import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react"; 
import '../App.css';
import { useUser } from '../context/UserContext';
import Header from "../components/Header";
import { createElement } from "react"; //tutaj dodwac p w chato



function Home() {

    const {user}= useUser();
    const token = localStorage.getItem('token');

    const [messages,setMessages] = useState([
    
       {text: "Cześć jestem Math Mentor", from: "bot"},
       {text: "Mogę pomóc w problemach matematycznych, wyjaśnieniach i nie tylko!", from: "bot"},
    ])

    //use effect daj taki efekt ze wiadomosci laduja sie raz - i ewentualnie pryz zmianie usera
    useEffect(() => {
    async function handleoldMessage() {
        try {
        const oldMessages = await fetch("http://localhost:5001/api/app/chatbotMessageHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ user: user }),
        });
        const oldMessagesData = await oldMessages.json();
        console.log("Old messages:", oldMessagesData.messages);

        oldMessagesData.messages.map((message) => {
            setMessages(e => [...e, { text: message.content, from: message.isAI ? "bot" : "user" }]);
        });
    } catch (error) {
        console.error("Error accessing old messages:", error);
    }

    }
    handleoldMessage();
    }, [user]);
    
    

    const [message, setMessage] = useState({text: ""});

    function handleMessageChange(e){
        setMessage({...message,text: e.target.value}); 
        } 
    
    

   const chatbotMessageSend = async (e) => {
        console.log("test test tees")
        setMessages(e => [...e, { text: message.text, from: "user" }]);
        const wiadomosac = message.text;
        console.log("wiadomosac", wiadomosac);
        setMessage({ text: "" });
        try {
            const response = await fetch("http://localhost:5001/api/app/chatbotMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: wiadomosac, user:user}),
            });
            const data = await response.json();
            console.log("Response from server:", data);
            if (response.ok) {
                setMessages(e => [...e, { text: data.message, from: "bot" }]);

            }
            else {
                console.error("Error from server:", data.message);
                setMessages(e => [...e, { text: "Error: " + data.message, from: "bot" }]);
            }
        }
        catch (error) {
                console.error("Error:", error);
            }

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