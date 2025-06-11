import React, { use } from "react";
import Header from "../components/Header";
import { useState , useEffect} from "react";
import { Document, Page, } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useUser } from '../context/UserContext';



pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js";
function Knowledge() {

    const {user}= useUser();
    const token = localStorage.getItem('token');


    const [pdfList, setPdfList] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
    try {
        fetch("http://localhost:5001/api/app/getPDFList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
                              <button key={pdf._id || index} className="text-center text-lg underline" onClick={() => setSelectedPdf(pdf)}>{pdf.filename}</button>
                        ))}
                    </div>
                    {selectedPdf && (
                        <div style={{ width: "600px", margin: "0 auto" }}>
                            <Document
                                file={`http://localhost:5001/uploads/${selectedPdf.filename}.pdf`}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                onLoadError={console.error}
                            >
                                {Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                        />
                                    )
                                )}
                            </Document>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
export default Knowledge;