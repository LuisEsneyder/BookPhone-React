const mongoose=require('mongoose');
const pasword = process.argv[2]
const url = `mongodb+srv://phonebook:${pasword}@phone.wrpnt.mongodb.net/PhoneBook?retryWrites=true&w=majority`
mongoose.connect(url)
//esquema 
const PhoneBookShecma = new mongoose.Schema({
    name : String,
    number : String
})
//Modelo
const  PhoneBook= mongoose.model('PhoneBook',PhoneBookShecma)
if(process.argv.length < 4){
    console.log('phonebook:')
    PhoneBook.find({}).then(result=>{
        result.forEach(persona=>{
            console.log(persona.name)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}else{
    // crear un phonebook con el modelo
const phoneBook = new PhoneBook({
    name : process.argv[3],
    number : process.argv[4]
})

// guardar
phoneBook.save().then(result=>{
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook `);
    mongoose.connection.close()
})
}


