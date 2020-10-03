const User = require('../modal/userAuth_modal');
const password_utility = require('../utility/bcrypt_password');
const body = require('body-parser');
const colorify = require('../chalk/chalk');
const genrate_token = require('../utility/jwt');
const validation = require('../utility/validator');
const Post = require('../modal/userPost_modal');

const key = 'dabfjelbfljfbambcjeabdjcb';

const signupUser = async(req, res, next) => {
      
   
    let { name, password, email } = req.body;

// req.body input validation;
const validate_data = validation(name,'string') + validation(password,'number') + validation(email,'email');

if(validate_data == 1){

try{

 const find_user = await User.findOne({ email: email });

 if(!find_user){  

password = password_utility.hash_password(password,12);

const user = new User({ name, password, email});

const create_user = await user.save();

if(create_user) return res.status(200).send('Singup Successfully');// after completion only send Signup SuccessFull;
 
}

 return res.status(406).send('Email already exists');// not acceptable

}catch(err){

    //console.log(colorify.red(err));
    res.status(404).send(err);
}

}
  return res.status(406).send('Fill all fields properly');


}



const signinUser = async(req, res, next) => {
        
    let { email, password } = req.body;

    try{

 const find_user = await User.findOne({ email: email });
    
    if(find_user){

      const compared_password = password_utility.compare_password(password, find_user.password);   

      if(compared_password){

        const genratedToken = genrate_token({ id:find_user.id }, key);

        const body = {

            genratedToken, response:find_user
        }
        
        //res.setHeader('Content-Type', 'application/json');
        
        //res.setHeader('authorization', 'username '+genratedToken);
        return res.status(200).send(body);
   
    }
      return res.status(401).send('Password is incorrect');//unAuthorized
        
    }

    return res.status(401).send('Invalid Email');

}catch(err){

       //console.log(err);
       res.status(401).send({message:'Try Again!'});//request failed;
}   

}

const searched_user = async (req, res, next) => {

const {id} = req.params;

//console.log(req.params.id+'-------------------------------');

try{

  const search_data = await User.findOne({_id:id});

  if(search_data){
   
    //console.log(search_data);
 const post_data = await Post.find({postedBy:search_data._id});
  
  if(post_data){
 //   console.log(post_data);
   return res.status(200).send([post_data,search_data]);
    //res.send(search_data);
  }
 

}


}catch(err){
  //console.log(err);
  res.status(401).send('Error Try again!');
}

} 

const follow = async(req, res, next) =>{

  const{id} = req.body;// follwer id of another user send by client during a follow req. of a particulr user;
  const {_id} = req.user;// following id; it will reach automTIC by jwt;
  //console.log(req.body.id+'----paramsa------');
  //console.log(req.user+'----requser--------');

  try{

     const response = await User.findByIdAndUpdate({_id:id},{
      
      $push:{followers:_id}
    },{
      new:true
    });

    if(response){


     // console.log(response+'------follower------');
      const response1 = await User.findByIdAndUpdate({_id:_id},{
        
      $push:{ following:id }
      
    },{new:true});
      
    if(response1){

    
        //console.log(result+'-------foll0wing response---------');
       return res.status(200).send(response);
    }
       // console.log(err+'---from following part');
     return res.status(401).send('Try Again!');
  }    
      //res.send(response);
  }catch(err){
      //console.log(err);
      res.status(401).send('Try Again!');

  }

}


const unfollow = async(req, res, next) =>{

  const{id} = req.params;// follwer id of another user send by client during a follow req. of a particulr user;
  const {_id} = req.user;// following id; it will reach automTIC by jwt;
  //console.log(req.params.id+'----paramsa------');
  //console.log(req.user+'----requser--------');

try{

     const response = await User.findByIdAndUpdate({_id:id},{
      $pull:{followers:_id}
    },{
      new:true
    });

      //console.log(response);
   if(response){

     
   const result = await User.findByIdAndUpdate({_id:_id},{
        
      $pull:{ following:id }
      
    },{new:true});
      
  if(result){

        //console.log(result);
    return  res.status(200).send(response);
    
       // console.log(err+'---from following part');
      
  }
    return  res.status(401).send(err);
  
}
    
}catch(err){

  res.status(401).send('Try Again!');

}    
      //res.send(response);
   
}

const loggedIn_userProfile = async (req, res, next) =>{
 
  const {_id} = req.user;

  try{
 
    const Profile_data = await User.findOne({_id:_id});

    if(Profile_data){

      //console.log(Profile_data);
    return res.status(200).send(Profile_data);
    }
  
  }catch(err){

    //console.log(err);
    res.status(401).send('Try Again!');
  }
}

const update_Password = async(req, res, next) => {

  let { oldPassword, newpassword } = req.body;
 const{_id} = req.user;
  //console.log(newpassword);
 
  try{

    const check_credentials = await User.findById({_id: _id});

   if(check_credentials){
   
    const check_password =  password_utility.compare_password(oldPassword,check_credentials.password);
   
    
   if(check_password){
 
      //console.log(check_credentials+'-----------pasword matched');
     
      //console.log(newpassword+'-------------newpassword----------');

      newpassword = password_utility.hash_password(newpassword,12);
    
     if(newpassword){

      const upadate_password = await User.findByIdAndUpdate({_id: _id},{ password: newpassword});
    
  
    if(upadate_password){

      //console.log(upadate_password+'-------------password updated-----------');
    return res.status(200).send(upadate_password);
         
}

}
  
//return res.status(401).send('Password can not be changed');

}

}

return res.status(401).send(' Old password is incorrect')
  
  }catch(err){

    //console.log(err);
    res.status(401).send('Try Again!');
  }


}

const updateProfile_picture = async(req, res, next) => {

  const {profile_pic} = req.body;
  
  const {_id} = req.user;
  
  try{

  
  const findUserandUpdate= await User.findByIdAndUpdate({_id:_id},{ userProfile:profile_pic },{new:true});

  if(findUserandUpdate){
     
   //console.log(findUserandUpdate+'----------profile pic updated------');
  return res.status(200).send(findUserandUpdate);


  }
  
  //console.log('profile pic didnt update'+'-------------profile didnt update');
res.status(401).send('Profile picture can not be updated, Try Again!');
  
  }catch(err){

//console.log(err);
res.status(401).send('Something went wrong, Try Again!');

  }  
  
  
  
  }


module.exports = { signupUser, signinUser, follow, unfollow, searched_user,loggedIn_userProfile, update_Password, updateProfile_picture };
