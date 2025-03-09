const { Mistral } = require('@mistralai/mistralai');
require('dotenv').config();
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey});

async function AITopicGenerator(content) {
    try {
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                { role: "system", content: "You are an AI that give a topic to a text file." },
                { role: "user", content: `this is the content of the file${content} and only give one word answer, no statement nothing only one word!!` }
            ],
          });   
        return chatResponse.choices[0].message.content
    } catch (error) {
        console.error("Error generating question:", error);
        return null;
    }
}
module.exports = AITopicGenerator;