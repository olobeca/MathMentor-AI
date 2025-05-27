const { OpenAI } = require('openai');
const openai = new OpenAI();

async function generateEmbeddings(text) {
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
        encoding_format: 'float',
    });

    console.log(embedding)
    return embedding.data.embedding;
} 

module.exports = {
    generateEmbeddings
};