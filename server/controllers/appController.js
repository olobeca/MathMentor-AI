const path = require('path');
const { spawn } = require('child_process');
const embedingsService = require('../services/embedingsService');
const chatbotService = require('../services/chatbotService');

const express = require('express'); 
const message = require('../models/message');
const user = require('../models/user');
const pdf = require('../models/pdf');

const fs = require('fs');
exports.generatePDF = async (req, res) => {
    try { 
        if(!req.file)
          {  return res.status(400).json({ message: 'No file uploaded' });
        }
        const userObj = typeof req.body.user === 'string' ? JSON.parse(req.body.user) : req.body.user;

       // if (!req.body.pdfName || !userObj || !userObj.id) {
       //     return res.status(400).json({ message: 'Missing required fields' });
       // }

        // Po uploadzie req.body.pdfName już jest dostępne!
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        const oldPath = path.join(uploadsDir, req.file.filename);
        const newFilename = req.body.pdfName + '.pdf';
        const newPath = path.join(uploadsDir, newFilename);

        fs.renameSync(oldPath, newPath);

        embedingsService.addingPdfToDatabase(req.body.pdfName, userObj.id);

        console.log('Wywołuję skrypt Python z plikiem:', newPath);
        const pythonProcess = spawn('python3', [
            path.join(__dirname, '..', 'PdfTextConverter.py'),
            newPath
        ],{env: { PYTHONIOENCODING: 'utf-8'}});

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        }); 

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`python error output: ${errorOutput}`);
                console.error(`Python script exited with code ${code}`);
                return res.status(500).json({ message: 'Error processing PDF' });
            }

            //console.log('Python script output:', output);

            const pythonProcess2 = spawn('python3', [ //change to python if you are on windows
            path.join(__dirname, '..', 'TextToChunk.py'),
            output
            ], { env: {...process.env, PYTHONIOENCODING: 'utf-8'}});

            let output2 = '';
            let errorOutput2 = '';
            
            pythonProcess2.stdout.on('data', (data) => {
                output2 += data.toString();
            });

            pythonProcess2.stderr.on('data', (data) => {
                errorOutput2 += data.toString();
            }); 

            pythonProcess2.on('close', async (code) => {
                if (code !== 0) {
                    console.error(`Python script exited with code ${code}`);
                    console.error(`python error output: ${errorOutput2}`);
                    return res.status(500).json({ message: 'Error processing PDF' });
                }

                //console.log('Python script output:', output2);
                console.log('debug deubufwejffeuifhweiufghWEUFHGLJSDFHLAsduHFGioweusgyfew8iyufgbeilufgdesfcsedbifb')
                const embeddings = [];
                chunks = output2.split('===').filter(chunk=> chunk.trim()); 
                for (const chunk of chunks) {
                    try{
                        const embedding = await embedingsService.generateEmbeddings(chunk)
                        console.log('chunk processes succesfully')
                        console.log('Embedding z chunku:', embedding);
                        embeddings.push(embedding);
                        await embedingsService.saveChunk(chunk, embedding, newFilename);
                     } catch (error) {
                        console.error('Error generating embeddings:', error);
                     } 
                
                }
                res.status(200).json({ message: 'PDF processed successfully!', data: output2 });
                
            });
            
        });



    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
}

exports.chatbotMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const {user } = req.body;
        chatbotService.addedMessageToDatabase(message,user.id, false);
        console.log('Received message:', message);
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ message: 'Invalid message format' });
        }
        const embeddedText = await embedingsService.generateEmbeddings(message); 
        const responseFromDb = await chatbotService.getKnowledgeFromDatabase(message, embeddedText);
        console.log('Knowledge from database:', responseFromDb.results+ 'zrodlo informacji' + responseFromDb.pdfSource);
        const response = await chatbotService.generateResponse( message, JSON.stringify(responseFromDb.results), JSON.stringify(responseFromDb.pdfSource));
        chatbotService.addedMessageToDatabase(response,user.id, true);
        console.log('Chatbot response:', response);
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error in chatbotMessage:', error);
        res.status(500).json({ message: 'Error processing chatbot message' });
    }
}

exports.chatbotMessageHistory = async (req, res) => {
    try {
        const { user } = req.body;
        const messages2 = await chatbotService.getChatbotMessageHistory(user.id);
        res.status(200).json({ messages: messages2 });
        
    } catch (error) {
        console.error('Error in chatbotMessageHistory:', error);
        res.status(500).json({ message: 'Error retrieving chatbot message history' });
    }
}

exports.getPDFList = async (req, res) => {

    try { 
        const pdfs = await pdf.find({}); // Pobiera tylko pole pdfName
        if (!pdfs || pdfs.length === 0) {
            return res.status(404).json({ message: 'No PDFs found' });
        }
        res.status(200).json({ pdfs });

    }  catch (error) {
        console.error('Error retrieving PDF list:', error);
        res.status(500).json({ message: 'Error retrieving PDF list' });
    }


}