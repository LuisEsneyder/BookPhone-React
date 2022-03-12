const mongoose = require('mongoose');

const url = process.env.MOONGO_URI;
console.log('connecting to ', url);
mongoose.connect(url).then(result=>{
    console.log('connect to MongoDb');
})
.catch((error)=>{
    console.log('error connecting to MongoDb',error.message);
})

const PhoneBookShecma = new mongoose.Schema({
    name : String,
    number : String
})

PhoneBookShecma.set('toJSON',{
    transform : (document, returnedObjec)=>{
        returnedObjec.id = returnedObjec._id.toString(),
        delete returnedObjec._id,
        delete returnedObjec.__v
    }
})

module.exports = mongoose.model('PhoneBook', PhoneBookShecma)