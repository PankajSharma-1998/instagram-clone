import React,{ useState } from 'react';
import './Login.scss';
import {useHistory,Link} from 'react-router-dom';
import axios from 'axios';
import {NotifyMe} from '../../Component/Utility/NotifyMe';
import {RingLoader} from "react-spinners";
import { css } from "@emotion/core";

const Login = (props) => {
    
    const history = useHistory();

    const[password,setpassword] = useState("");
    
    const[email,setemail] = useState("");

    
//setting a sppiner until data submitted;
const[toggle_sppiner,settoggle_sppiner] = useState(true);

    
    const submit = async(e) => {
    // submmiting login data;
        e.preventDefault();

        settoggle_sppiner(false);
      
        const data = { email, password }
    
       
       try{
    
       const response = await axios.post('http://localhost:8080/signin',data);
     
       if(response.status === 200){

    // checking response status;

    // setting a jwt token key so that we can have access to protected routes.
    //these token will be send to server as headers;  
    localStorage.setItem('jwtkey',response.data.genratedToken);

     // setting up a login-status at local storage which will helpful do get userId to perform several tasks;
    //like showing follow btn for guestuser not for login user by matching up the login userId and guest userId by useParams(); 
    localStorage.setItem('login_status',true);
    localStorage.setItem('user_id',response.data.response._id);
    settoggle_sppiner(true);
    //after login push to home storage;
    window.location.reload();    
    return history.push("/");

   
  }
       
    
}catch(err){
    
    settoggle_sppiner(true);
  return NotifyMe('error','Wrong credentials');
    
}
    
    }



    return (
        
        <div className="login">

  <div className="login-container-1">          
     <header>
        <h1>Instagram</h1>
    </header>

<input type="text" placeholder="User Email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
<input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
<button className="login-btn" onClick={submit}>
{toggle_sppiner ? 'Login' : <RingLoader css={spinner_css} size={25} color="black" />}
</button>

</div>

<div className="login-container-2">

<span>Don't have an account? <Link to="/signup">Sign Up</Link></span>

</div>

</div>

);

};


export default Login;


// to add css to spinner.
const spinner_css = css`

position:relative;
margin:auto;
font-weight:bold;
`