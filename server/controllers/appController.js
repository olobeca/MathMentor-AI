const path = require('path');
const { spawn } = require('child_process');

const express = require('express'); 
exports.generatePDF = async (req, res) => {
    try { 
        if(!req.file)
          {  return res.status(400).json({ message: 'No file uploaded' });}
        

        const pdfPath = path.join(__dirname, '..', 'uploads', req.file.filename);
        console.log('Wywołuję skrypt Python z plikiem:', pdfPath);
        const pythonProcess = spawn('python', [
            path.join(__dirname, '..', 'PdfTextConverter.py'),
            pdfPath
        ]);

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
                console.error(`Python script exited with code ${code}`);
                return res.status(500).json({ message: 'Error processing PDF' });
            }

            console.log('Python script output:', output);
            res.status(200).json({ message: 'PDF processed successfully!', data: output });
        });


    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
}
