const { OpenAI } = require("openai");
const chunk = require('../models/chunk'); 

//test if this is required
const dotenv = require('dotenv'); 
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


async function getKnowledgeFromDatabase(message,embeddedText) {
    try { 
        const chunks = await chunk.find({})
        const agg = [{
            '$vectorSearch': {
                'index':'embedding_index',
                'path': 'embedding',
                'queryVector': embeddedText,
                'numCandidates': 18,
                'limit': 5
            }

        }, {
            '$project': {
                '_id': 0,
                'plot': 1,
                'title': 1,
                'text': 1,
                'score': {
                    '$meta': 'vectorSearchScore'
                },

            }
        }]
        const results = await chunk.aggregate(agg); //chunks czy chunk
        return results;

    } catch (error) {
        console.error("Error connecting to the database:", error);
        return "Nie mogę uzyskać dostępu do bazy danych.";
    }



    return "Placeholder knowledge from the database.";
    }


async function generateResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        {role:"system", content:"Jesteś nauczycielem z matematyki dla uczniów szkół średnich. Twoim zadaniem jest odpowiadać na pytania dotyczące matematyki,głównie będziesz skupiał się na zadaniach z matury rozszerzonej, razem z zapytaniem dostaniesz wiedze z bazy danych, jak nie wiesz jak odpowiedzieć to napisz, że nie wiesz, ale postaraj się odpowiedzieć najlepiej jak potrafisz."},
        { role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}



module.exports = {
    generateResponse,
    getKnowledgeFromDatabase
    };