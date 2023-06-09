const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: "../.env" });


const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://cjtakhar.github.io',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  });

  // Concatenate all the suggested completions into a single string
  const fullResponse = completion.data.choices
    .map((choice) => choice.text)
    .join("");

  res.header('Access-Control-Allow-Origin', 'https://cjtakhar.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.send(fullResponse);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

