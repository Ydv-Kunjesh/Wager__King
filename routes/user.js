const express = require('express')
const router = express.Router()
const user = require('../models/user.js')
const { use } = require('passport')
const wrapAsync = require('../jarurifiles/wrapAsync')
const passport = require('passport')
const { setReturnUrl } = require('../jarurifiles/loggedIn')
const userControler = require('../controllers/user.js')

router.get("/signup",userControler.renderingSignUpForm)
router.post('/signup', wrapAsync(userControler.signUpNewUser))
router.get('/login', userControler.renderingLoginForm)
router.post('/login',setReturnUrl, passport.authenticate('local', {
    failureRedirect: '/login',
     failureFlash: true

}), userControler.postLogin)  
router.get('/logout', userControler.logout)
 

module.exports = router;

 

