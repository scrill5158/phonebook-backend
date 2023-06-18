require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require("morgan")
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))
app.use(cors())
morgan.token("body", req => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :body - status :status length :res[content-length] - :response-time ms"
  )
);

/* let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] */

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.get('/api/info', (request, response) => {
    response.send('<p>Phonebook has info for ' + persons.length + ' people</p>'+Date())
    response.end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      name: body.content,
      number: body.important || false,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})