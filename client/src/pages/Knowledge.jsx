import React from "react";
import Header from "../components/Header";

function Knowledge() {


    function takePdfList() {
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
                // Here you can handle the PDF list data, e.g., display it in the UI
            })
            .catch(error => {
                console.error("Error fetching PDF list:", error);
            });

        } catch (error) {
            console.error("Error fetching PDF list:", error);
        }

    }
        takePdfList();

    


    return (
        <div>
            <Header />
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