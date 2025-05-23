
const express = require('express'); 
exports.generatePDF = async (req, res) => {
    try { 
        if(!req.file)
          {  return res.status(400).json({ message: 'No file uploaded' });}
        res.status(200).json({ message: 'PDF generated successfully!' });

    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
}