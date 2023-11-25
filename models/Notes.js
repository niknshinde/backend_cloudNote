
const mongoose = require("mongoose")
const { Schema } = mongoose;


const NotesSchema = new mongoose.Schema({
   //below line store user id this is important to know which note is written by which user 
    user:{

        type:mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
    title:{
    type: String,
    required:true
    } ,
    description:{
        type:String,
        required:true, 
        //below line ensoure that email are unique for all users

    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports = mongoose.model('note',NotesSchema)