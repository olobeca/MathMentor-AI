import React, { use } from "react"; 
import { useUser } from '../context/UserContext';
import Header from "../components/Header";
import '../App.css';
import { useState } from "react";
import { useEffect } from "react";

function AdminPannel() {   

    const {user}= useUser();
    const token = localStorage.getItem('token');

    useEffect(() => {
    console.log("user in home page", user);
    }, [user]);

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfName, setPdfName] = useState(""); 

    const handlePdfNameChange = (e) => {
        setPdfName(e.target.value);
    };

    const uploadingPDF = async (e) => {
        if(!pdfFile) {
            alert("Please select a file");
            return;
        } 
        if(pdfName.trim() === "") {
            alert("Please enter a PDF name");
            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", pdfFile); 
        formData.append("user", JSON.stringify(user)); 
        formData.append("pdfName", pdfName);
        try {
            const response = await fetch("http://localhost:5001/api/app/uploadPDF", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log("Success:", data);
            if (data.message === 'PDF uploaded successfully') {
                alert("PDF uploaded successfully");
            } else {
                alert("Error uploading PDF");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error uploading PDF");
        }

    }



    return ( 
        <div> 
            <Header/>
            <div className=" background-div "> 
                    <div className="welcome-pages-frame-div w-[520px] h-[520px] ">  
                        <h1 className="welcome-h1">Admin Pannel</h1>
                        <div className="w-full mb-5 flex items-center  gap-1">
                            <input type="file" placeholder='pdf' accept=".pdf" onChange={e => setPdfFile(e.target.files[0])}></input>
                            <button onClick={uploadingPDF} className="w-full entry-page-color hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-900 rounded-md text-white  py-2 px-4">Submit</button>
                            
                        </div>
                        <div className="w-full mb-5 flex items-center  gap-1">
                            <input type="text" placeholder='pdf name' value={pdfName} onChange={handlePdfNameChange} className="input"></input>
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}

export default AdminPannel;