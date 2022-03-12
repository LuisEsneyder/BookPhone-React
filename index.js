require('dotenv').config()
const express = require('express')
const morganBody = require('morgan-body')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const persons = require('./models/persons')
const app = express()


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
app.get('/',(req,res)=>{
    res.send('Hola')
})
app.get('/api/persons',(req,res)=>{
    persons.find({}).then(result=>{
        res.json(result)
    })
})
app.get('/api/info',(req,res)=>{
    const lengPersonas= persons.length;
    const fecha = new Date()
    res.send(`phonebook has info for ${lengPersonas}  ${fecha}`)
})
app.get('/api/persons/:id',(req, res,next)=>{
    const id =  req.params.id;
    persons.findById(id).then(persona=>{
        if(persona){
            res.json(result)
        }
        res.status(404).end()
    })
    .catch(error=>next(error))
})
app.delete('/api/persons/:id',(req,res,next)=>{
    const id =  req.params.id;
    persons.findByIdAndDelete(id).then(result=>{
        res.status(202).end()
    }).catch(error=>next(error))
})
app.put('/api/persons/:id',(req,res,next)=>{
    const id = req.params.id;
    const body = req.body;
    const persona = {
        name : body.name,
        number :  body.number
    }
    persons.findByIdAndUpdate(id,persona).then(result=>{
        res.json(result)
    }).catch(error=>next(error))
})
app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error : 'number or name none'
        })
    }
    const persona = persons({
        name : body.name,
        number : body.number
    })
    persona.save().then(result=>{
        res.json(result)
    })
    
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)
const errorHandle = (error, request,response,next)=>{
    console.error(error.message)
    if(error.name==="CastError"){
        response.status(400).send({error : 'malformatted id'})
    }
    next(error)
}
app.use(errorHandle)
app.listen(process.env.PORT || 3001,()=>{
    console.log(`server on in the port ${process.env.PORT}`)
})