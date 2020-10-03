
import React,{useState} from 'react';
import Posts from './Posts/Posts';
import './Profile.scss';
import link from './Posts/unkonwns.png';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";
import { NotifyMe } from '../Utility/NotifyMe';

const Profile = (props) => {

const history = useHistory();

const[profile,setProfile] = useState("");
const[toggle,settoggle] = useState(true); 
const[profilePic, setProfilePic] = useState("");
 
        

//use useEffect instead of IIFE, i used IIFE just for testing;
if(true){

        (function() {
   
      const token = localStorage.getItem('jwtkey');
      // geeting logged in user profile data by jwt setted req.user at server;

           axios.get('http://localhost:8080/loggedIN_User_Profile',{
      
              headers: {"Authorization": "Bearer "+token}
           }).then(res=>{
            if(res.status === 200){
              
               setProfile(res);
            }  
    
           }).catch(err=>{
            console.log(err);
           
          });
    
    
    })();

}

const update_profilePic = async() =>{

if(profilePic){

const file_body = new FormData();

file_body.append('file',profilePic);
file_body.append('upload_preset','instagram-clone');
file_body.append('cloud-name','pankajvbn');



try{

    const file_data = await axios.post('https://api.cloudinary.com/v1_1/pankajvbn/image/upload',file_body);
     
    if(file_data.status == 200){
    
      const profile_pic = String(file_data.data.url);
     
      const token = localStorage.getItem('jwtkey');
      const data = { profile_pic }
      
     const server_response = await axios.put('http://localhost:8080/updateProfile_picture',data,{
      
     headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
     
    });
     
     if(server_response.status===200){

         NotifyMe('success','Your Profile Pic is updated successfully');
         settoggle(true);
         setProfilePic("");
      return history.push('/profile');
     
    }
    return NotifyMe('error','Your Profile didnt update');
     
    }
    
    }catch(err){
      
NotifyMe('error','Your Profile update failed, Try again!');
       
    }
}else{
    
  NotifyMe('error','Please add a picture');
}

}


    return (
       
        <div className="profile">       
 
 {profile ? 
  
 <div className="profile-child">    

<img className="profile-pic" src={profile.data.userProfile !== "No profile" ? profile.data.userProfile : link} /> 
  


<div className="profile-details">

<div className="profile-1">

  <span>{profile.data.name}</span>
  <span>{profile.data.email}</span>


<div>
  <span>Followers:{profile.data.followers.length}</span>
  <span>Following:{profile.data.following.length}</span>
</div>

</div>

<div className="profile-2">

<Link to="/ChangePassword">  
  <button className="edit-profile-btn">Change Password</button>
</Link>

{!profilePic ?

<>
{toggle ?

<button className="update-btn" onClick={()=>{settoggle(false)}}>Update Profile Picture</button>

:
<label htmlFor="profiles">
<input type="file" id ="profiles" placeholder="Update Profile" onInput = {(e)=>{setProfilePic(e.target.files[0]);}} />
Choose File
</label>

}

</> : <button className="update-btn" onClick={update_profilePic}>Submit</button> }

</div>

</div>




</div>

 :
 
<div className="spinners">
  
  <PropagateLoader css={spinner_css} size={15} color="#2196f3" />

</div>

} 

{profile ? 

<Posts />
: null}

</div>

    );

};

    


export default connect(null,null)(Profile);

// to add css to spinner.
const spinner_css = css`

position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);`