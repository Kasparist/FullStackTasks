const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post-content', (tokens) => { return JSON.stringify(tokens.body) })

app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan((':method :url :status :res[content-length] - :response-time ms :post-content')))
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Contacts!</h1>')
})

app.get('/api/persons', (request, response) => {
    console.log("BÄKK", persons)
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people\n` + new Date())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    let id = Math.floor(Math.random() * 96) + 5
    person.id = id
    const personName = persons.find(p => p.name === person.name)

    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (personName) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    persons = persons.concat(person)

    console.log(person.id)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.put('/api/persons/:id', async (req, res, next) => {
    const person = { id: req.params.id, name: req.body.name, number: req.body.number }
    res.json(person)
    next()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})