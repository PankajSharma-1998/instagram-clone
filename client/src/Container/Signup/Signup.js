import React,{ useState } from 'react';
import '../Login/Login.scss';
import { NotifyMe } from '../../Component/Utility/NotifyMe';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';
import {RingLoader} from "react-spinners";
import { css } from "@emotion/core";


const Signup = (props) => {

const history = useHistory();

 const [name,setname] = useState("");
 
 const[password,setpassword] = useState("");
 
 const[email,setemail] = useState("");

   
//setting a sppiner until data submitted;
const[toggle_sppiner,settoggle_sppiner] = useState(true);



const submit = async(e) => {

    e.preventDefault();

    settoggle_sppiner(false);

 if(password.length >= 6){

  const data = {name, password, email}

   try{

   const response = await axios.post('https://cloned-insta.herokuapp.com/signup',data);

   if(response.status === 200){
    
    NotifyMe('info','Successfully signed up');
    settoggle_sppiner(true);
    history.push('/signin');
   
}

   
}

catch(err){
  
  settoggle_sppiner(true);
    return NotifyMe('error','Email is already exist or Name is empty or email is not valid');

}

}else{

  settoggle_sppiner(true);
  return NotifyMe('error','Password should be atleast of 6 characters');

}


}
    return (

<div className="login">

  <div className="login-container-1">  

     <header>
        <h1>Instagram</h1>
    </header>

<input type="text" className="User Name" placeholder="User Name"  value={name} onChange={(e)=>{setname(e.target.value)}} />
<input type="email" placeholder="User Email"   value={email} onChange={(e)=>{setemail(e.target.value)}} />
<input type="password" placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}} />
<button className="login-btn" onClick={submit}>
{toggle_sppiner ? 'Sign Up' : <RingLoader css={spinner_css} size={25} color="black" />}
</button>

<span>By signing up, you agree to our Terms , Data<br /> Policy and Cookies Policy .</span>

</div>

<div className="login-container-2">

<span>Have an account? <Link to="/signin">Login</Link></span>

</div>


</div>
  
  );

};

export default Signup;


// to add css to spinner.
const spinner_css = css`

position:relative;
margin:auto;
font-weight:bold;
`