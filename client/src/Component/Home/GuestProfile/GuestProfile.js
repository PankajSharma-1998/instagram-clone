import React,{ useState } from 'react';
import link from '../../Profile/Posts/unkonwns.png';
import {connect} from 'react-redux';
import Posts from '../../Profile/Posts/Posts';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import '../../Profile/Profile.scss';

const GuestProfile = (props) => {

  //const[guestProfile,setguestProfile] = useState(props.profile_data);  
  const[post,setpost] = useState([]);

  // profile data of guestuser;
  const[profile_data,setProfile_data] = useState("");

  //getting the params of guest user which is set during rounting see app.js file;
  const user = useParams();
  const id = user.userId;

const user_info = localStorage.getItem('user_id');// loggedin userId;

    const follow_request = () => {

        // id of user to whom i m going to follow;
        const data = {id:id}

      const token = localStorage.getItem('jwtkey');
      
           axios.put('http://localhost:8080/follow/',data,{
      
              headers: {"Authorization": "Bearer "+token}
           
            }).then(res => {
              if(res.status === 200){

             setProfile_data(res.data);  
          }

           }).catch(err => {
               
            console.log(err);
           
            });
    
    
    }


    const unfollow_request = () => {
   
      //id of guest user setted as params;

      const token = localStorage.getItem('jwtkey');
      
           axios.get(`http://localhost:8080/unfollow/${id}`,{
      
              headers: {"Authorization": "Bearer "+token}
      
            }).then(res => {
              if(res.status === 200){

             setProfile_data(res.data);  
        }
           }).catch(err => {

               console.log(err);
           
            });
    }


    if(true) {

        (async function(){

            try{
        
         const token = localStorage.getItem('jwtkey');
        
         // note donot put url/user/:${id} instaed put url/user/${id} to get req.params at server otherwise req will failed;
         const response = await axios.get(`http://localhost:8080/user/${id}`,{
        
            headers: {"Authorization": "Bearer "+token}

        });
        
    // here we are getting the posts and and profile data both at a time  of guestuser sent from server as an array;
    // at zero index it is profile data and at 1st it is post data;     
        if(response.status == 200){
        
        setProfile_data(response.data[1]);// for profile data of guest;

        setpost([...response.data[0]]);// for post
        
        }
        
    }catch(err){
        
     console.log(err);
            
    }
}
        
)(); 
               
}  
        
    
return (
   
<div className="profile">

<div className="profile-child">       

        <img src={profile_data.userProfile !== "No profile" ? profile_data.userProfile : link} />   

    <div className="profile-details">


    <div className="profile-1">

    <span>{profile_data.name}</span>

    <span>{profile_data.email}</span>

<div>


{profile_data ?  

<> <span>Followers:{profile_data.followers.length}</span>

<span>Following:{profile_data.following.length}</span>

</> 

: null } 

</div>

</div>


<div className="profile-2">

{/*here if logged user id matches up with guest user then it will not show follow and unfollow icon*/}
{id !== user_info ?

<>

{profile_data.followers ? 

<>

 {!profile_data.followers.includes(user_info) ?

  <button className="follow-btn" onClick={follow_request}>Follow</button> :
  <button className="follow-btn" onClick={unfollow_request}>Unfollow</button>

} </> :  <button className="follow-btn" onClick={follow_request}>Follow</button> } 

</> : null }

</div>

    
</div>

</div>

    

<Posts guest_user={post} />

</div>


);

};

/*const mapStateToProps = (state) =>{

    return {

        profile_data: state.data
    }
}*/



export default connect(null,null)(GuestProfile);