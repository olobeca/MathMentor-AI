import React from "react"; 
import { useUser } from '../context/UserContext';
import Header from "../components/Header";
import '../App.css';
import { useState } from "react";

function AdminPannel() {   

    const {user}= useUser();
    console.log("user in home page", user);
    const [pdfFile, setPdfFile] = useState(null);

    const uploadingPDF = async (e) => {
        if(!pdfFile) {
            alert("Please select a file");
            return;
        } 
        const formData = new FormData();
        formData.append("pdfFile", pdfFile); 
        try {
            const response = await fetch("http://localhost:5001/api/users/uploadPDF", {
                method: "POST",
                body: formData,
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
                            <input type="file" placeholder='pdf' accept=".pdf" ></input>
                            <button onChange={e => setPdfFile(e.target.files[0])} onClick={uploadingPDF} className="w-full entry-page-color hover:bg-gradient-to-r hover:from-pink-600 hover:to-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-900 rounded-md text-white  py-2 px-4">Submit</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AdminPannel;