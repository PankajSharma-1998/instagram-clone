const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Userauth_Schema = new mongoose.Schema({
   
  name:{
      type:String,
      trim:true,
      min:2
    },

    password:{
        type:String,
        required:true,
        min:6
    },

    userProfile :{
      type:String,
      default:"No profile"
   },

  email:{

      type:String,
      required:true
      
  },

  followers:[{type:ObjectId,ref:'user'}],
  following:[{type:ObjectId,ref:'user'}]

},{timestamps:true});

module.exports = mongoose.model('user',Userauth_Schema);