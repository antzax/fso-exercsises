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

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next);
});

app.get("/api/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(`Phonebook has info for ${persons.length} 
        ${new Date()}`);
    })
    .catch((err) => next);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      res.json(person);
    })
    .catch((err) => next(err));
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

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.body.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      person.name = name;
      person.number = number;

      person.save().then((savedPerson) => {
        res.json(savedPerson);
      });
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
