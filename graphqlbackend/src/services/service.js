const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_APIKEY,
});

const askBookAI = async (question) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: question,
  });

  return response.text;
};

module.exports = {
  askBookAI,
};