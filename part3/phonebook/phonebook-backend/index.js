require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./modules/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :req[content-length] - :response-time[2] ms :body'
  )
)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err))
})

app.get('/api/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(`Phonebook has info for ${persons.length} 
        ${new Date()}`)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }
      res.json(person)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }

      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', async (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  newPerson
    .save()
    .then((newPerson) => {
      res.json(newPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }

      person.name = name
      person.number = number

      person
        .save()
        .then((savedPerson) => {
          res.json(savedPerson)
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id', name: err.name })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, name: err.name })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`)
})
