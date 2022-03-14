const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MOONGO_URI
console.log('connecting to ', url)
mongoose.connect(url).then( result => {
    console.log('connect to MongoDb',result.connections.map(ele => ele.name))
}).catch(error => {
    console.log('error connecting to MongoDb',error.message)
})

const PhoneBookShecma = new mongoose.Schema({
    name :  {
        type : String,
        required: true,
        unique: true,
        minlength: 3
    },
    number : {
        type : String,
        minlength:8
    }
})
PhoneBookShecma.plugin(uniqueValidator)
PhoneBookShecma.set('toJSON',{
    transform : (document, returnedObjec) => {
        returnedObjec.id = returnedObjec._id.toString(),
        delete returnedObjec._id,
        delete returnedObjec.__v
    }
})

module.exports = mongoose.model('PhoneBook', PhoneBookShecma)