const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')


//user signup
router.post('/signup', UserController.user_signup)

// user login 
router.post('/login', UserController.user_login)

// delete user
router.delete('/:userID', UserController.user_delete)

// delete all users
router.delete('/delete/allusers', UserController.user_delete_all)

module.exports = router;