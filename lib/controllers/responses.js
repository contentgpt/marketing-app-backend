const { Router } = require('express');
const { generateResponse } = require('../services/OpenAi');

module.exports = Router ()
  .post('/', async (req, res, next) => {
    try {
      console.log('req.body', req.body);
      const response = await generateResponse(req.body.messages);
      console.log('response', response);
      res.json({ response });
      
    } catch (e) {
      next(e);
    }
  });
