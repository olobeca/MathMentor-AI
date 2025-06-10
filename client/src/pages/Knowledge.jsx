import React, { use } from "react";
import Header from "../components/Header";
import { useState , useEffect} from "react";

function Knowledge() {

    const [pdfList, setPdfList] = useState([]);

    useEffect(() => {
    try {
        fetch("http://localhost:5001/api/app/getPDFList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("PDF List:", data);
            setPdfList(data.pdfList || []);
        })
        .catch(error => {
            console.error("Error fetching PDF list:", error);
        });

    } catch (error) {
        console.error("Error fetching PDF list:", error);
    }
}, []);

    
    return (
        <div>
            <Header />
            <div className=" background-div ">
                <div className="welcome-pages-frame-div w-[820px] h-[620px] ">
                    <h1 className="welcome-h1">Knowledge Base</h1>
                    <div className="w-full mb-5 flex flex-col items-center  gap-1">
                        <p className="text-center text-lg">This is a knowledge base page where you can find information about the application, how to use it, and other relevant details.</p>
                        {pdfList.map((pdf, index) => (
                            <p key={index} className="text-center text-lg">{pdf}</p>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Knowledge;