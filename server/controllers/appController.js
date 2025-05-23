const pdfService = require('../services/pdfService'); 

exports.generatePDF = async (req, res) => {
    try {
        const pdf  = req.body 
        await pdfService.DownloadPdf(pdf);

    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }

}