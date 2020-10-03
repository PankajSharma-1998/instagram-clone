//const { populate } = require('../modal/userPost_modal');
// user post middleware;
const Post = require('../modal/userPost_modal');
const User = require('../modal/userAuth_modal');

// it is used to create post;
const create_post = async(req, res, next) => {

    const { title, content, url } = req.body;

    if(!content && !url) return res.status(204).send('Please add all fields');//no content

//console.log(req.user+''+'from user post');// it should be placed after jwtToken_auth.js middleware so that it can grab req.user,set by the jwt middleware.
//    res.send('ok im geeting dara');

    const post_data = new Post({ title, content, url, postedBy:req.user });// it already set by jwt middleware;

    try{

        const posted_data = await post_data.save();

    if(posted_data) return res.status(200).send(posted_data);//OK

    return res.status(204).send('Nothing is posted');

}catch(err){
    
    return res.status(400).send(err);// bad request;
}

}


// it is used to get all post data created by any user;

const all_posts = async(req, res, next) => {
  
    // here we will get all posts;
try{
    const posts = await Post.find().populate('postedBy','name userProfile').sort('-createdAt');
    //first argument is key which contain userId('objectId') and second argument is string 
    // which constain all data that we require like (" name id email ") all data should be in single string with a single space;here we are gettig only name;

    // here by using populate method we will get the name and email of postedBy('which contain userid', or we can say from a particular user)
    // this is working becoz we already provide ref to user in post Schema.;
    
    if(posts) return res.status(200).send(posts);

}catch(err){

    return res.status(404).send(err);// not found;
}

}

const myPosts = async(req, res, next) => {

    try{

    const my_post = await Post.find({ postedBy: req.user.id}).populate('postedBy','name userProfile').sort('-createdAt');
    // searching the id of postedBy user which is set by jwt middleware
    // by making a new key which is req.user;
    
    if(my_post) return res.status(200).send(my_post);
    
}catch(err){
    
    return res.status(401).send(err);
    
    }
}

const like = (req,res,next)=>{
    
    //console.log(req.body);
    //console.log(req.user);
    
    Post.findByIdAndUpdate({_id:req.body.postId},{
        $push:{like:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
    
        if(err){
       // console.log(err);
       return res.status(401).send('Something went wrong!');
    }else{
        //console.log(result);
        return res.status(200).send(result);
     
    }
    
}) 

}

const unlike = (req,res,next)=>{
    
   // console.log(req.body);
    //console.log(req.user);
    
    Post.findByIdAndUpdate({_id:req.body.postId},{
        $pull:{like:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
    
        if(err){
        //console.log(err);
        return res.status(401).send('Something went wrong!');

    }else{
        //console.log(result);
       return res.status(200).send(result);
     
    }
    
}) 
}

const comment = (req,res,next)=>{
    
    //console.log(req.body+'--------------');
    //console.log(req.user+'----------');

    const comments = {
     text: req.body.text,
     postedBy:req.user.name  }// who posted the comment here we are only takin the name not objectId;

    Post.findByIdAndUpdate({_id:req.body.postId},{
        $push:{comment:comments}
    },{
        new:true
    }).exec((err,result)=>{
    
        if(err){
       // console.log(err);
       return res.status(401).send('Something went wrong!');
              
    }else{

        //console.log(res);
     return res.status(200).send(result);
    }
    
}) 

}

const delete_post = async(req, res, next) => {
   const {id} = req.params;
 //  console.log(req.params.id+'------------------');
   
 try{

   const delete_status = await Post.findByIdAndDelete({_id:id});

    if(delete_status){
       
 
        //console.log(delete_status);
       return res.status(200).send(delete_status);
        
    }

}catch(err){
    //console.log(err);
    return res.status(404).send('Error deleting Post, Try again!');
}

}


const Following_posts = async(req,res,next) => {

    const{_id} = req.user;

    try{

    const find_user = await User.findById({_id:_id});

    if(find_user){

        let find_post=[];
      // console.log(JSON.stringify(find_user)+'------------find_user----------');
    const following_user = [...find_user.following];
    //console.log(following_user.length+'------------following_user----------');
   
    var i =0;

    while(i <= following_user.length){

       // console.log(following_user[i]+'---------------i------------------');

     find_post[i] = await Post.find({postedBy:following_user[i]}).populate('postedBy','name userProfile').sort('-createdAt');

     //console.log(find_post+'-----------post mil gayi');
    
     i++
   continue;  
}

//console.log(find_post);

res.status(200).send(find_post);

   
}

}catch(err){
    
    //console.log(err);
    res.status(401).send('Error! Try Again');

}

}


module.exports = { create_post, all_posts, myPosts, like, unlike, comment, delete_post, Following_posts };