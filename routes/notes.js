const notesRouter = require('express').Router();
const { join } = require('path');

notesRouter.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'notes.html'));
});

module.exports = notesRouter;