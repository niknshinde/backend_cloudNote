
const mongoose = require("mongoose")
const { Schema } = mongoose;



const UsersSchema = new mongoose.Schema({
    name:{
    type: String,
    required:true
    } ,
    email:{
        type:String,
        required:true,
        //below line ensoure that email are unique for all users

        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports = mongoose.model('user',UsersSchema)