import React,{useEffect,useState} from 'react';
import './Toolbar.scss';
import { Link, useHistory } from 'react-router-dom';

//import Logout from '../../Container/Logout/Logout';

const Toolbar = (props) => {

    const history = useHistory();

      const logout = () => {

        localStorage.clear();// clear the stored token;
        window.location.reload();
        history.push('/signin');
       
     }


return (
        <div className="navbar">

 <nav> 

<ul>

<li>Instagram</li>

<li> 
<Link to="/">
<i class="fa fa-home" aria-hidden="true"></i>
</Link>
</li>

<li>
<Link to="/profile">  
<i class="fa fa-user-circle"></i>
</Link>
</li>

<li>
<Link to="/create_post">  
<i class="fa fa-plus-square" aria-hidden="true"></i>
</Link>
</li>

<li>
<i class="fa fa-sign-out" onClick={logout}></i>
</li>

</ul>

</nav>


</div>

);

}

export default Toolbar;