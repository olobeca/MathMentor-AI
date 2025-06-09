const { OpenAI } = require("openai");
const chunk = require('../models/chunk'); 
const message = require('../models/message'); 

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
                'sourceFile': 1

            }
        }]
        const results = await chunk.aggregate(agg); //chunks czy chunk
        const pdfSource = results.length > 0 ? results[0].sourceFile : null;
        return {results, pdfSource};

    } catch (error) {
        console.error("Error connecting to the database:", error);
        return "Nie mogę uzyskać dostępu do bazy danych.";
    }

    }


async function generateResponse(prompt, context, pdfSource) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        {role:"system", content:"Jesteś nauczycielem z matematyki dla uczniów szkół średnich. Twoim zadaniem jest odpowiadać na pytania dotyczące matematyki,głównie będziesz skupiał się na zadaniach z matury rozszerzonej, razem z zapytaniem dostaniesz wiedze z bazy danych, jak nie wiesz jak odpowiedzieć to napisz, że nie wiesz, ale postaraj się odpowiedzieć najlepiej jak potrafisz.Pamietaj ze masz zawsze podawać źródło informacji - nazwa pdfa z którego korzystasz."},
        { role: "user", content: prompt },
        {role: "user", content: context},
        {role: "user", content: `Źródło informacji: ${pdfSource ? pdfSource : "brak"}`}]
  });
  return response.choices[0].message.content;
}


async function addedMessageToDatabase(message2, userId, isAI) {
    const newMessage = new message({
        content: message2,
        user: userId,
        isAI: isAI
    });
    await newMessage.save();
    return newMessage;
}

async function getChatbotMessageHistory(userId) {
    try {
        const messages = await message.find({ user: userId }).sort({ createdAt: -1 });
        return messages;
    } catch (error) {
        console.error("Error fetching chatbot message history:", error);
        throw new Error("Nie mogę uzyskać historii wiadomości.");
    }
}

module.exports = {
    generateResponse,
    getKnowledgeFromDatabase,
    addedMessageToDatabase,
    getChatbotMessageHistory}