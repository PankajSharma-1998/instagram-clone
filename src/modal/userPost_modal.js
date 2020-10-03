const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Post_Schema = new mongoose.Schema({
   
    title: {

        type:String,
        default:"no title",
},

content: {
        
    type:String,
    required: true,
},

url: {

    type:String,// url of photo is a string;
    required:true,
},

postedBy: {
    // here in database it will only store user id,instead of whole user object that we have seen in postman.
    type: ObjectId,// id of particular user from user model;
    ref: "user"// it reference to the user model; the name is case-sensitive;
    // this ref also work for me to populate the particular user by postedBy('which conatin ObjectId of particular user');
},
like:[{type:ObjectId,ref:"user"}],
comment:[{

    text:String,
        postedBy:{type:String,ref:"user"}
    }]


},{timestamps:true});

module.exports = mongoose.model("User-posts", Post_Schema);