const mongoose =require("mongoose")

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    }
})

const playerDB = mongoose.model('playerDB',schema)//name and shape of document in mongodb
module.exports = playerDB