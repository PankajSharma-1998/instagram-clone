import React,{ useState } from 'react';
import './Posts.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import  {bindActionCreators} from 'redux';
import * as Action from '../../../Reducer/ProfileAction';
import {Link} from 'react-router-dom';




const Posts = (props) => {

    const[post,setpost] = useState([]);
  
// toggle will set false after data will be recieved;

if(true) {

(async function(){
// do not use useEffect here otherwise it will run on every update and then we will not able to get data;
    try{

 const token = localStorage.getItem('jwtkey');

 const response = await axios.get('https://cloned-insta.herokuapp.com/post/myPosts',{

    headers: {"Authorization": "Bearer "+token}
 });



if(response.status == 200 && response.data.length >= 1){


return setpost([...response.data]);

}

    }catch(err){

        console.log(err);
    
    }
}


)(); 
       
}  

const Preview = (posts) => {

    props.Post.ProfileImage_preview(posts);

}




//console.log(props.Post);

    return (

<div className="posts">

{props.guest_user || post.length !==0 ? 

<>

{!props.guest_user ?

<> {post.map(posts=>{{/*logged in user posts*/ }

          return <Link to="/profile_preview">
              
          <img src={posts.url} onClick={()=>{Preview(posts)}} />
          
          </Link>

      })}</>
      
      :

      <> {props.guest_user.map(posts=>{

        return <Link to="/profile_preview">
        
        <img src={posts.url} onClick={()=>{Preview(posts)}} />
        
        </Link>
      })} </>
    
    } </> :
    
    <div>
    <span>    
    No Posts <i class="fa fa-window-maximize" aria-hidden="true"></i>
    </span>
    </div>}  

        </div>
    
        );
};



const mapDispatchToProps = (dispatch) =>{
    
    return { 

            Post: bindActionCreators(Action,dispatch)

    }
 }

export default connect(null,mapDispatchToProps)(Posts);