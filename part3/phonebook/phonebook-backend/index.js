require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./modules/person");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :req[content-length] - :response-time[2] ms :body"
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${Person.find({}).then(
    (persons) => persons.length
  )} people</p><p>
  ${new Date()}
    </p>`);
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => {
      res.status(404).end();
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (person) {
        res.status(404).end();
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const existing = await Person.findOne({ name: body.name });
  if (existing) {
    return res.status(400).json({ error: "name must be unique " });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((newPerson) => {
    res.json(newPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
