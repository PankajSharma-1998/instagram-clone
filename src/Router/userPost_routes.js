const { create_post, all_posts, myPosts, like, unlike, comment, delete_post, Following_posts } = require('../middleware/userPost');

const router = require('express').Router();

const jwt_token = require('../middleware/jsonToken_auth.js');


router.post('/posts', jwt_token, create_post);
router.get('/allPosts',all_posts);
router.get('/myPosts',jwt_token,myPosts);
router.put('/like',jwt_token,like);
router.put('/unlike',jwt_token,unlike);
router.put('/comment',jwt_token,comment);
router.delete('/deletePost/:id',jwt_token,delete_post);
router.get('/following_posts',jwt_token,Following_posts);

module.exports = router; 