
require("dotenv").config();
const axios = require("axios");
// backend/api/fakeNewsCheck.js

exports.checkFakeNews = async (req, res) => {
  const { newsContent } = req.body;

  try {
    console.log("Received news content:", newsContent);
    if (!newsContent) {
      return res.status(400).json({ error: "News content is required." });
    }
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-fake-news-detection',
      { inputs: newsContent },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const predictions = response.data?.[0]; // Unwrap the nested array

    if (!predictions || predictions.length === 0) {
      return res.status(500).json({ error: "Invalid prediction format." });
    }
    // console.log("Predictions:", predictions); // Log the predictions for debugging
    const topResult = predictions.reduce((prev, curr) =>
      prev.score > curr.score ? prev : curr
    );

    const verdict = topResult.label === "LABEL_1" ? "Real News ✅" : "Fake News ❌";
    const confidence = (topResult.score * 100).toFixed(2);

    // console.log("Verdict:", verdict, "Confidence:", confidence); // Log the verdict and confidence for debugging

    res.json({ verdict, confidence });
  } catch (error) {
    console.error("Hugging Face API error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}

exports.summarizeNews = async (req, res) => {
  const { newsContent } = req.body;

  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Summarize the following news article in a clear, professional tone. 
    The summary should be concise (3–5 sentences), mention the key event, main people or organizations involved, and the overall impact. 
    Avoid unnecessary details and maintain a neutral, factual style.
    
    News Article: ${newsContent}
    `;
    const result = await model.generateContent(prompt);

    const summary = await result.response.text();
    // console.log("News Summary:", summary);

    res.status(200).json({ 
      sucess: true,
      summary: summary
    }); 

  } catch (error) {
    console.error("Google Generative AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};
