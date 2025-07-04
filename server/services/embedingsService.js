const { OpenAI } = require('openai');
const openai = new OpenAI();
const Chunk = require('../models/chunk');
const Pdf = require('../models/pdf');

 
async function addingPdfToDatabase(pdfname, userId) {
    const pdf = new Pdf({
        filename: pdfname,
        source: `uploads/${pdfname}.pdf`,
        user: userId
    });

    await pdf.save();
    console.log('PDF saved successfully:', pdf);
    return pdf;

}


async function generateEmbeddings(text) {
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
        encoding_format: 'float',
    });

    console.log(embedding)
    return embedding.data[0].embedding;
}  


async function saveChunk(text, embedding, sourceFile) {
    const chunk = new Chunk({
        text: text,
        embedding: embedding,
        sourceFile: sourceFile
    });

    await chunk.save();
    console.log('Chunk saved successfully:', chunk);
    return chunk;
}

module.exports = {
    generateEmbeddings,
    saveChunk,
    addingPdfToDatabase
};