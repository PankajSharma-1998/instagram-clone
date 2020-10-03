const router = require('express').Router();
const user_auth = require('../middleware/userAuths');
const jwt_token = require('../middleware/jsonToken_auth.js');


router.post('/signin',user_auth.signinUser,jwt_token);

router.post('/signup',user_auth.signupUser);

/*router.get('/token_auth',jwt_token,(req,res)=>{
    res.send('hello user');
    console.log(JSON.stringify(req.user)+''+'from user route');// it will catch the req.user obj,which is set by the jwtmiddleware; 
});*/

router.get('/user/:id',user_auth.searched_user);
router.put('/follow',jwt_token,user_auth.follow);
router.get('/unfollow/:id',jwt_token,user_auth.unfollow);
router.get('/loggedIN_User_Profile',jwt_token,user_auth.loggedIn_userProfile);
router.put('/update_password',jwt_token,user_auth.update_Password);
router.put('/updateProfile_picture',jwt_token,user_auth.updateProfile_picture);

module.exports = router;