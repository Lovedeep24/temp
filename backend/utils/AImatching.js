const { Mistral } = require('@mistralai/mistralai');
require('dotenv').config();
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey});

async function AIMatching(content, existingContent) {
    try {
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                { role: "system", content: "You are an AI that compares the similarity of the text file." },
                { role: "user", content: `this is the content of the first file${content} and this is the content of the second file ${existingContent}, after comparison only give reply in number percentage not anyother strings only number!! no special characters as well` }
            ],
          });  
        return chatResponse.choices[0].message.content
    } catch (error) {
        console.error("Error generating question:", error);
        return null;
    }
}
module.exports = AIMatching;