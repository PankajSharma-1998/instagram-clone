const jwt = require('jsonwebtoken');
const User = require('../modal/userAuth_modal');
const {JWT_KEY} = require('../config/deployment');

const jwt_token = ( req, res, next ) => {

    const {  authorization } = req.headers;// headers coming from clients;
   

    if(!authorization){

     return res.sendStatus(404);
    
    }
    
const token =  authorization.replace("Bearer ", "");

jwt.verify(token,JWT_KEY, (err, result) => {// here result will be the particular user who used this middleware;

    if(err){
    
   return res.sendStatus(404);
    
}

//console.log(JSON.stringify(result)+''+'from json auth at 23');
//it will return an _id of particular user. becoz this middleware is present in  routes of users and post;

  User.findById({ _id:result.id }).then((user) => {
      
    //console.log(user+""+ 'from jsonAuth at 30');// return a object of particular user with which key is belongs to;
    req.user = user;// it will create the header with user key and value is user thrown by jwt_token vaerification; 
    
    next();
  
}).catch(err=>{
   // res.status(401).send('Request failed');
   res.send('Error Try Again');

   next();
});

});

}

module.exports = jwt_token;