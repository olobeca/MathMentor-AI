const path = require('path');
const { spawn } = require('child_process');
const embedingsService = require('../services/embedingsService');



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

            const pythonProcess2 = spawn('python', [
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

            pythonProcess2.on('close', (code) => {
                if (code !== 0) {
                    console.error(`Python script exited with code ${code}`);
                    console.error(`python error output: ${errorOutput2}`);
                    return res.status(500).json({ message: 'Error processing PDF' });
                }

                //console.log('Python script output:', output2);
                console.log('debug deubufwejffeuifhweiufghWEUFHGLJSDFHLAsduHFGioweusgyfew8iyufgbeilufgdesfcsedbifb')
                output2.split('===').forEach((chunk)=> {
                    if(chunk.trim()) {
                        ///console.log('Processing chunk:', chunk);
                     try{
                       chunk_actual = embedingsService.generateEmbeddings(chunk)
                        .then(() => {
                            console.log('Chunk processed successfully');
                            console.log('embeding z chunku:', chunk_actual);
                        })
                        .catch((err) => {
                            console.error('Error processing chunk:', err);
                        });
                     } catch (error) {
                        console.error('Error generating embeddings:', error);
                     } 


                    }
                    })
                res.status(200).json({ message: 'PDF processed successfully!', data: output2 });
                
            });
            
        });


    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
}
