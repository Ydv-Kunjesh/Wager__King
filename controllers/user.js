const user = require('../models/user')

module.exports.renderingSignUpForm =  (req, res) => {
    res.render("users/signup.ejs") 
}

module.exports.signUpNewUser = async (req, res) => {
   try {
    let { username, email, password } = req.body;
    const newUser = new user({ email, username })
       let registered = await user.register(newUser, password)
       req.login(registered, (err)=>{
           if (err) {
               return next(err)
           }
            req.flash("success", `${username} you have registered Successfully!`)
            res.redirect('/listings')
       })    
   } catch (error) {
       console.log(error)
       req.flash('error', error.message)
       res.redirect('/signup')
   }

}

module.exports.renderingLoginForm =  (req, res) => {
    res.render("users/login.ejs")
}

module.exports.postLogin = async (req, res) => {
    const user = req.user
    req.flash('success', `Welcome back ${user.username} `)
    res.redirect(res.locals.returnUrl || '/listings')
}

module.exports.logout = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'You must be logged in to log out!');
        return res.redirect('/login');
    }
    const { username } = req.user
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success',`Hey ${username} you have logged out successfully`)
        res.redirect('/listings');
    });
}