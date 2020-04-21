const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

 

const albumSchema = new Schema({
 albums: 
        { 
            name:   String
           
        }
})




      
const groupeSchema = new Schema({    
    groupes: {
        
        about: String,
        languages: Array
       
    }

})


const langSchema = new Schema({
   
    languages :Array,

})



const profileSchema = new Schema({


    nickname:  {
        
        type : String,
       unique: true,
        required: true
     }, 
    email:   {
        type: String,     
        index: {
            unique: true, 
            dropDups: true}
    },
    password: { 
        type: mongoose.SchemaTypes.String, 
        required: true, 
        select: false
    },

    age: Number,
    gender: {type:String},
    city: String, 
    description: String,

    registeredAt: { 
        type: Date, 
        default: Date.now()},
    

//you can use the populate() method in a query to replace the id with the actual data.
    languages : Array,

    albums: [albumSchema] 



})

  


// Place des methodes

 mongoose.model('profiles', profileSchema);

 // export model profiles with profileSchema
  