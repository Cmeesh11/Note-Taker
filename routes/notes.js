const notesRouter = require("express").Router();
const { join } = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

notesRouter.get("/", (req, res) => {
  res.json(join(__dirname, "..", "db", "db.json"));
});

notesRouter.post("/", (req, res) => {
  // Get existing notes
  fs.readFile(join(__dirname, "..", "db", "db.json"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Parsing existing notes
      const parsedNotes = JSON.parse(data);
      // Giving new note an id
      req.body.id = uuidv4();
      // Appending new note to object
      parsedNotes.push(req.body);
      // Stringifying notes
      let notes = JSON.stringify(parsedNotes, null);
      fs.writeFile(join(__dirname, "..", "db", "db.json"), notes, (err) =>
        err ? console.error(err) : console.log("Sucessfully added note")
      );
    }
  });

  req.body;
});

module.exports = notesRouter;
