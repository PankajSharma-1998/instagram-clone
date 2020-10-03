import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './ChangePassword.scss';
import axios from 'axios';
import {NotifyMe} from '../../Utility/NotifyMe';
import {RingLoader} from "react-spinners";
import { css } from "@emotion/core";



const ChangePassword = (props) => {

    const[oldPassword,setOldpassword] = useState("");
    const[newpassword,setNewpassword] = useState("");

    //setting a sppiner until data submitted;
const[toggle_sppiner,settoggle_sppiner] = useState(true);
   
    const history = useHistory();

  const submit = async(e) => {
      
e.preventDefault();

    settoggle_sppiner(false);

    const data={oldPassword:oldPassword,newpassword:newpassword}

    const token = localStorage.getItem('jwtkey');

   
   try{
     
    const update_data = await axios.put('http://localhost:8080/update_password',data,{

        headers: {"Authorization": "Bearer "+token,"App-name":"Instagram-clone"}
      
    });

    if(update_data.status===200) {

       // console.log(update_data);
       history.push('/profile');
       settoggle_sppiner(true);
      return NotifyMe('info','Password changed successfully');
      

    }
      
}  catch(err){
  settoggle_sppiner(true);
  return NotifyMe('error','Old password was incorrect');
}

  }


    return (
        <div className="edit-profile">
       <header>
           <h2>Change Password</h2>
           </header>    
     <div className="edit-container"> 

<label>

  <input type="password" placeholder="Old Password" value ={oldPassword} onChange={(e)=>{setOldpassword(e.target.value)}} />
   
</label>

<label> 
  <input type="password" placeholder="New Password"   value ={newpassword} onChange={(e)=>{setNewpassword(e.target.value)}} />
   
</label>

</div>
<button className="edit-profile-btn1" onClick={submit}>
{toggle_sppiner ? 'Change Password' : <RingLoader css={spinner_css} size={25} color="black" />}
</button>

        </div>
    );
};

export default ChangePassword;


// to add css to spinner.
const spinner_css = css`

position:relative;
margin:auto;
font-weight:bold;
`