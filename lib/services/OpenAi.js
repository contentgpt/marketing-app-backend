const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (userPrompt) => {
  if (!configuration.apiKey) {
    throw new Error('OpenAI API key not configured');
  }  
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          'role': 'system', 
          'content': 'You are an expert marketing content writer for small businesses in the North American outdoor industry.' 
        },
        { 
          'role': 'user', 
          'content': `${userPrompt}`, 
        }
      ],
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error(error.message);
    }
  }
};

module.exports = { generateResponse };
