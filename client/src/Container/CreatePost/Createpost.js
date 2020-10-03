import React,{ useState } from 'react';
import './Createpost.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {NotifyMe} from '../../Component/Utility/NotifyMe';
import {RingLoader} from "react-spinners";
import { css } from "@emotion/core";

const Createpost = (props) => {

const history = useHistory();

//setting images which will be uploaded;
const[photo,setphoto] = useState("");

// setting title of post;
const[title,settitle] = useState("");

//setting content of post;
const[content,setcontent] = useState("");

// setting a sppiner until data submitted;
const[toggle_sppiner,settoggle_sppiner] = useState(true);


//submmiting file or photo data;
const submit = async(e) => {

  e.preventDefault();
//showing sppiner on create post btn;
settoggle_sppiner(false);

// creating a file body using new FormData();  
const file_body = new FormData();

//appending data which is an image. first key tells what kind of input it is, here it is file;
file_body.append('file',photo);

// these two lines are related to cloudinary database which is taking my cloudname and upload_preset;
file_body.append('upload_preset','instagram-clone');
file_body.append('cloud-name','pankajvbn');


//checking wether file_body is empty or not;
if(file_body){

try{

const file_data = await axios.post('https://api.cloudinary.com/v1_1/pankajvbn/image/upload',file_body);
 
if(file_data.status == 200){

  // getting the response url from cloudinary database,and will send it to mongodb;
  const url = String(file_data.data.url);
 
  // getting jwtkey for server from local storage to access the protected routes;
  const token = localStorage.getItem('jwtkey');

  // sending data body to server;
  const data = { title, content, url }

//posting post data to server;  
const server_response = await axios.post('https://cloned-insta.herokuapp.com/post/posts',data,{
  
// setting headers to get authenticated from server;
 headers: {"Authorization": "Bearer "+token}
 
});
 
 if(server_response.status === 200){

  NotifyMe('success','Your Post is created successfully')
  //removing sppiner on create post btn;
  settoggle_sppiner(true);
  return history.push('/profile');
 
}
 
}

}catch(err){
  
  NotifyMe('error','Post creation failed, Try Again!');
  settoggle_sppiner(true);
   
}

}else{

  NotifyMe('warn','Select a file.');
  settoggle_sppiner(true);
}

}


  return (
        <div className="create-post">

       <header>
        <h1>Create Post</h1>   
        </header>

      
      <input type="text" placeholder="Post Title" value={title} onChange={(e)=>{settitle(e.target.value)}} />
      
      
    
      <input type="text" placeholder="Post Description" onChange={(e)=>{setcontent(e.target.value)}} />
     
      <br /><br />

     <label htmlFor="files" className="label">
       Upload Image
    {/*sending file data by targeting the id. Here input tag is at zero index*/}
      <input type="file" id ="files" onChange={(e)=>{setphoto(e.target.files[0])}} />
      
      </label> 

      <button className="create-post-button" onClick={submit}>
        {toggle_sppiner ? 'Create Post' : <RingLoader css={spinner_css} size={25} color="black" />}
        </button>       
    
        </div>
    
    );

  }

export default Createpost;


// to add css to spinner.
const spinner_css = css`

position:relative;
margin:auto;
font-weight:bold;
`