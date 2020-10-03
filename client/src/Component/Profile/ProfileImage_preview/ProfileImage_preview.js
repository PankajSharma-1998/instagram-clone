import React,{ useState } from 'react';
import { connect } from 'react-redux';
//import  {bindActionCreators} from 'redux';
//import * as Action from '../../../Reducer/ProfileAction';
import '../../Home/Home.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {NotifyMe} from '../../Utility/NotifyMe';

const ProfileImage_preview = (props) => {
 
// console.log(props.post);
 const history = useHistory();

 const[allPost,setAll] = useState([]);  
 const[toggle,settoggle] = useState(true);   
 const[like_status,setLikeStatus] = useState(false);
 const[text,settext] = useState("");
 const[commentBox_toggler,setcommentBox_toggler] = useState("");
const[condition,setCondition] = useState(!false);
const[Comment_data,setComment_data] = useState([]);
const[likes,setlikes] = useState([]);
 
 
const userId = localStorage.getItem('user_id');
//console.log(userId);
 
 const like = (id) => {
  
 const data = {postId:id}

 const token = localStorage.getItem('jwtkey');
 
      axios.put('http://localhost:8080/post/like',data,{
 
         headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
      }).then(res=>{
          //console.log(res);
          if(res.status === 200){

          setlikes([...res.data.like]);
        window.location.reload();
    }
      }).catch(err=>{
          //console.log(err);
          NotifyMe('error','Try Again!');
      });
 }
 
 const unlike = (id) => {
     
     const data = {postId:id}
      // console.log(data);
     const token = localStorage.getItem('jwtkey');
     
          axios.put('http://localhost:8080/post/unlike',data,{
     
             headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
          }).then(res=>{
              //console.log(res);
              if(res.status === 200){

              setlikes([...res.data.like]);
              //history.push('/profile');
        }
                 window.location.reload();
          }).catch(err=>{
             // console.log(err);
          NotifyMe('error','Try Again!')
            });
 }

 
const submit_comment = (id) => {
   
    //console.log(text);

    const data = {postId:id,text}
    //console.log(data);
  const token = localStorage.getItem('jwtkey');
  
       axios.put('http://localhost:8080/post/comment',data,{
  
          headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
   
        }).then(res=>{
            if(res.status === 200){

        setComment_data([...res.data.comment]);  
   
}

    }).catch(err=>{
   
        //console.log(err);
       NotifyMe('error','Comment cant be saved, try again!');
    });


}

const delete_post = async (post_Id) => {
     
    const token = localStorage.getItem('jwtkey');
   // console.log(post_Id);

    try{
    const delete_status = await axios.delete(`http://localhost:8080/post/deletePost/${post_Id}`,{

        headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
    });

    if(delete_status.status === 200){
        NotifyMe('info','Post deleted');
        return history.push('/profile');
    
    }

    

}catch(err){
    //console.log(err);
    NotifyMe('error','Post didnt deleted');
}
}

const comment_box_toggler = (id,condition) =>{
   
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

const info = props.post;


    return (
      

<>

{info ? 

<div className="home-content">  

    <div className="img-container">   
    <img src= {info.url} className="home-img"  />
</div><br />
<span className="title">{info.title}</span><br />
<span className="content">{info.content}</span><br />



{!info.like.includes(userId) ?
 
 <i class="fa fa-heart-o" like="true" onClick={()=>{like(info._id)}}></i> 

:
<i class="fa fa-heart"  unlike="false" onClick={()=>{unlike(info._id)}}></i> 
   
}

<i class="fa fa-comment-o" aria-hidden="true" onClick={()=>{comment_box_toggler(info._id,condition)}}></i>
    
{/*it is used to get rid of undefined due to empty like array so we make a const array to show zero length*/}

    {info.postedBy === userId ?  <i onClick={()=>delete_post(info._id)} class="fa fa-trash" aria-hidden="true"></i>: null} <br />
    
    <span className="like-counter">{likes.length !== 0 ? likes.length : info.like.length}likes</span><br />
   
   

<div className="comment-div">

<input type="text" placeholder="Add Comment" value={text} name = {info._id}  onChange={(e)=>{settext(e.target.value)}} />

<i class="fa fa-angle-double-right" onClick={()=>{submit_comment(info._id)}}></i>

</div>

{commentBox_toggler === info._id ?

<div className = "comment-box">

{info.comment.length > 0 || Comment_data.length > 0 ? 

<>

{!Comment_data.length > 0 ?



<>
{info.comment.map(y=>{
   return <span className="comments">{y.postedBy}<br />{y.text}</span>
})} </>

: <>{Comment_data.map(z=>{

return <span className="comments">{z.postedBy}<br />{z.text}</span>

})}</>

}</> : <span className="no-comment"><i class="fa fa-comments" aria-hidden="true"></i>No Comments </span> }

</div> : <div className="colapse"></div> }

     
</div>

: <> {history.push('/profile')} </>

}
</>
  
  );

};

const mapStateToProps = (state) =>{
    
    return {
       post : state.data
}

}




export default connect(mapStateToProps,null)(ProfileImage_preview);