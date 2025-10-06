const express = require("express");
const morgan = require('morgan')
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(morgan('tiny'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "12-43-234345",
  },
  {
    id: "3",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "4",
    name: "Anton Veijola",
    number: "0443042661",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>
  ${new Date()}
    </p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);
  console.log(id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = Math.max(...persons.map((p) => Number(p.id)));
  return String(maxId + 1);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const names = persons.map((p) => p.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (persons.map((p) => p.name).includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
