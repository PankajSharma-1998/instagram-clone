import React,{useState} from 'react';
import './Home.scss';
import axios from 'axios';
import link from '../Profile/Posts/unkonwns.png'
import {Link,NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Action from '../../Reducer/ProfileAction';
import {NotifyMe} from '../Utility/NotifyMe';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";


const Home = (props) => {

// to get whom i m following;    
const[followingPost,setFollowingPost] = useState([]);
//to get my posts;
const[myPost,setmyPost] = useState([]);
//toggler
const[toggle,settoggle] = useState(true);   

//used to set the text for commnet;
const[text,settext] = useState("");

// all posts;
const [Allpost,setAllpost] = useState([]);

// to get likes array from server;
const[likes,setlikes] = useState([]);

// to toggle the commnet box;
const[commentBox_toggler,setcommentBox_toggler] = useState("");
const[condition,setCondition] = useState(!false);

//to get all commnets which will be an array; 
const[Comment_data,setComment_data] = useState([]);


//setting up a userId of logged in user which is set to localstorage;
const userId = localStorage.getItem('user_id');


// function for a like;
// id of a post to which i m liking;
const like = (id) => {

const data = {postId:id}

const token = localStorage.getItem('jwtkey');

axios.put('https://cloned-insta.herokuapp.com/post/like',data,{

headers: {"Authorization": "Bearer "+token}
     
    }).then(res=>{
       
        if(res.status === 200){

       setlikes([...res.data.like]);
       window.location.reload();

    }  

     }).catch(err=>{
 
        console.log(err);
 
    });

}

// id of post to which i unliking;
const unlike = (id) => {
    
    const data = {postId:id}
      
    const token = localStorage.getItem('jwtkey');
    
         axios.put('https://cloned-insta.herokuapp.com/post/unlike',data,{
    
            headers: {"Authorization": "Bearer "+token}
      
        }).then(res => {
      
            if(res.status === 200){

             setlikes([...res.data.like]);
            window.location.reload();

            }  
      
            }).catch(err => {
             
                console.log(err);
         });
}



if(toggle) {

    (async function(){

    
    try{

const response = await axios.get('https://cloned-insta.herokuapp.com/post/allPosts');

if(response.status === 200){
   
   return setAllpost([...response.data]);
}
    
}catch(err){

        NotifyMe('error','Error fetching posts,Check your internet connection');
        return window.location.reload();
}

})();

}


if(false) {

    (async function(){

        try{
    
     const token = localStorage.getItem('jwtkey');
    
     const response = await axios.get('http://localhost:8080/post/myPosts',{
    
        headers: {"Authorization": "Bearer "+token}

    });
    
    
    
    if(response.status == 200 && response.data.length >= 1){
    
    return setmyPost([...response.data]);
    
    }
    
}catch(err){
    
    NotifyMe('error','Error fetching your posts');
    return window.location.reload();
        
}

}
    
    
)(); 
           
}  

if(false){

    (function(){

        const token = localStorage.getItem('jwtkey');

        // requesting to posts of my following;
        axios.get('http://localhost:8080/post/following_posts',{

            headers: {"Authorization": "Bearer "+token}

        }).then(res1 => {
       
            if(res1.status === 200){
        
            return setFollowingPost([...res1.data[0]]);  
    }

        }).catch(err => {
            
            NotifyMe('error','Error fetching following posts');
            return window.location.reload();

        }) 
    
    })()

}


const submit_comment = (id) => {
   
//id of post on which u r commenting;
// and text data;
    const data = { postId:id, text }
   
  const token = localStorage.getItem('jwtkey');
  
       axios.put('https://cloned-insta.herokuapp.com/post/comment',data,{
  
          headers: {"Authorization": "Bearer "+token}
       
        }).then(res => {
          
            if(res.status === 200){

        setComment_data([...res.data.comment]);  
        window.location.reload();
}

       }).catch(err => {
       
        NotifyMe('error','Try Again!');
       
        });


}


// use to toggle the comment box by using id of a particular post;
const comment_box_toggler = (id, condition) => {
   
    if(condition){

    setcommentBox_toggler(id);
    setCondition(!condition);
    // i m using this toggling of comment box only to open a particular post's comment box;
    // if i will use simple click and toggling it will opens up all post's comment box;
}else{

    setcommentBox_toggler("");
    setCondition(!condition);
}

}


    return (
     
     <>

 {Allpost.length !== 0 ?   


<>

{/*mapping the array*/}
{Allpost.map(x=>{

    
return(


<div className="home-content">   
{/*note do not put guestProflie/:${id} instaed put guestuser/${id} to
 set 'user/params'  for route otherwise route will not set params;*/}
  
  {/*sending guestprofile data of by using redux, which contains a Profile_data obj as methode; */}
<NavLink style={{textDecoration: 'none'}} to={"/guestProfile/"+x.postedBy._id} onClick={()=>{props.profile_data.Profile_data(x)}}>
   
       <div className="home-toolbar">
   
   {/*profile pic url of a particular user who posted the this post*/}

       <img src={x.postedBy.userProfile !== "No profile" ? x.postedBy.userProfile : link} />

    <span>{x.postedBy.name}</span>
   
     </div>  

 </NavLink>   

<div className="img-container">
{/*post created by a user*/} 
 <img src={x.url} className="home-img" />

</div><br />

<span className="title">{x.title}</span><br />
<span className="content">{x.content}</span><br />



{/*if particular posts like array includes the logged in user the it will show black heart otherwise it will show red heart*/}
{/*userId is of logged in user*/}
{/*sending _id of post to which u liked at 274 line*/} 
{!x.like.includes(userId) ?


 <i class="fa fa-heart-o" like="false" onClick={()=>{like(x._id)}}></i> 

:

<i class="fa fa-heart"  unlike="true" onClick={()=>{unlike(x._id)}}></i> 
   
}


<i class="fa fa-comment-o" aria-hidden="true" onClick={()=>{comment_box_toggler(x._id,condition)}}></i>
<br />
    
{/*it is used to get rid of undefined due to empty like array so we make a const array to show zero length*/}
{/*no need to do that also u can also use only x.like._length*/}
<span className="like-counter">{likes.length !== 0 ? likes.length : x.like.length}likes</span><br />


<div className="comment-div">

<input type="text" placeholder="Add Comment" value={text} name = {x._id}  onChange={(e)=>{settext(e.target.value)}} />

{/*submmiting comment for Post id which is _id*/}
<i class="fa fa-angle-double-right" onClick={()=>{submit_comment(x._id)}}></i>

</div>


{/*matches the condition on which commnet box should be toggled otherwise all will open at a time*/}
{commentBox_toggler === x._id ?

<div className = "comment-box">

{x.comment.length > 0 || Comment_data.length > 0 ? 

<>

{!Comment_data.length > 0 ?



<>

{x.comment.map(y=>{
   return <span className="comments">{y.postedBy}<br />{y.text}</span>

})} </>

: <>{Comment_data.map(z=>{

return <span className="comments">{z.postedBy}<br />{z.text}</span>

})}</>

}</> : <span className="no-comment"><i class="fa fa-comments" aria-hidden="true"></i>No Comments</span> }

</div> : <div className="colapse"></div> }

</div>

)
   
 })}

</>


: <div className="spinners">
  
   <PropagateLoader css={spinner_css} size={15} color="#2196f3" />
 
</div>

}

</>

);

};

const mapDispatchToProps = (dispatch) =>{

    return {

        profile_data:bindActionCreators(Action,dispatch)
    }

}

export default connect(null,mapDispatchToProps)(Home);

// to add css to spinner. for details see doc.
const spinner_css = css`

position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);`
