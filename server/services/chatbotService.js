const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

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
    };