import React,{ useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Container/Login/Login';
import Signup from './Container/Signup/Signup';
import Toolbar from './Component/Toolbar/Toolbar';
import Profile from './Component/Profile/Profile';
import Home from './Component/Home/Home';
import Createpost from './Container/CreatePost/Createpost';
import  ProfileImage_preview from './Component/Profile/ProfileImage_preview/ProfileImage_preview';
import GuestProfile from './Component/Home/GuestProfile/GuestProfile';
import ChangePassword from './Component/Profile/ChangePassword/ChangePassword';





function App( props ) {


const history = useHistory();

// checking the user login status which is created during login in login.js component.
const user = JSON.parse(localStorage.getItem('login_status'));

useEffect(()=>{

  if( user ){

    //if user is logged in it will redirect to home page;
    history.push("/");

  }else{

    // otherwise it will redirect to login page again;
    history.push('/signin');
  
  }

},[]);


  return (
  
  <>

{/*if user is logged in then it will display toolbar*/}
{user ? <Toolbar /> : null}
   
<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/signin" exact component={Login} />
  <Route path="/signup" exact component={Signup} />
  <Route path="/profile" exact component={Profile} />
  <Route path="/create_post" exact component={Createpost} />
  <Route path="/profile_preview" exact component={ProfileImage_preview} />

  {/*guestprofile path set with userId by useParams() which will pass to server to get data by req.params at server side*/}
  <Route path="/guestProfile/:userId" exact component={GuestProfile} />
  <Route path="/ChangePassword" exact component={ChangePassword} />
</Switch>

</>

);

}


export default App;
