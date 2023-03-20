// Creating express instance
const express = require('express');

// Routes
const notesRouter = require('./notes.js');

// Creating router
const router = express.Router();

router.use('/notes', notesRouter);

module.exports = router;