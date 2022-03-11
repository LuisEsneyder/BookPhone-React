const express = require('express')
const morganBody = require('morgan-body')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

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

  app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
morganBody(app)
const asiigPersona=(req,res,next)=>{
    const person=  req.body
    console.log(person)
    next()
}


const generadorId=()=>{
    return Math.random() * 10000
}
app.get('/',(req,res)=>{
    res.send('Hola')
})
app.get('/api/persons',(req,res)=>{
    res.json(persons)
})
app.get('/api/info',(req,res)=>{
    const lengPersonas= persons.length;
    const fecha = new Date()
    res.send(`phonebook has info for ${lengPersonas}  ${fecha}`)
})
app.get('/api/persons/:id',(req, res)=>{
    const id = Number( req.params.id);
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(JSON.stringify(person))
    }
    res.status(404).end()
    
})
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number( req.params.id);
    persons = persons.filter(person => person.id !== id)

    res.status(202).end()
})
app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error : 'number or name none'
        })
    }
    const persona = {
        name : body.name,
        number : body.number,
        id : generadorId()
    }
    const fiendPerson = persons.find(p=>p.name === body.name)
    if(fiendPerson){
       return  res.status(400).json({
           error : 'usuario ya existente'
       })
    }
    persons = persons.concat(persona)
    res.json(persona)
})
const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server on in the port ${PORT}`)
})