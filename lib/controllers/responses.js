const { Router } = require('express');
const { generateResponse } = require('../services/OpenAi');

module.exports = Router ()
  .post('/', async (req, res, next) => {
    try {
      const response = await generateResponse(req.body.userPrompt);
      res.json({ response });
    } catch (e) {
      next(e);
    }
  });
