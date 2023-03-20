const notesRouter = require("express").Router();
const { join } = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

notesRouter.get("/", (req, res) => {
  // Reading file and returning the parsed data as a response
  fs.readFile(join(__dirname, "..", "db", "db.json"), (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
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
      // Writing file with added note
      fs.writeFile(
        join(__dirname, "..", "db", "db.json"),
        JSON.stringify(parsedNotes, null, 4),
        (err) =>
          err ? res.json(err) : res.json("Sucessfully added note")
      );
    }
  });
});

notesRouter.delete("/:id", (req, res) => {
  // Get existing notes
  fs.readFile(join(__dirname, "..", "db", "db.json"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Parsing existing notes
      const parsedNotes = JSON.parse(data);
      
      // Filtering out object with matching id
      const newArr = parsedNotes.filter(object => {
        return object.id !== req.params.id;
      })

      // Writing file with deleted note
      fs.writeFile(
        join(__dirname, "..", "db", "db.json"),
        JSON.stringify(newArr, null, 4),
        (err) =>
          err ? res.json(err) : res.json("Sucessfully deleted note")
      );
    }
  });
});

module.exports = notesRouter;
