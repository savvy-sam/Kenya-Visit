const passport = require('passport');
//const connection = require('./model/model')
const LocalStrategy = require('passport-local'); 
const User = require('../model/model');
const validPassword = require('./authMethods').validPassword;



const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const authUser = async (username, password, done) => {
    try {
        const user = await User.findOne({email: username});

        if (!user){return done(null, false)};

        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid){
            return done(null, user)
        } else {
            return done(null, false)
        }

    }

    catch (error){
        console.log(error);
        return done(error, false);
    }
}



const strategy  = new LocalStrategy(customFields, authUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});






















/*
const authUser = (username, password, done) => {

    /* const user= Model.findOne({ username: username }).select("salt hash")
        .then((user) => {

            if (!user) { return done(null, false, {message: 'User Not Found'}) }

            console.log(user)

            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password Incorrect'});
            }
        })
        .catch((err) => {   
            console.log(err);
            done(err);
        });

}

*/
//const strategy  = new LocalStrategy(authUser);