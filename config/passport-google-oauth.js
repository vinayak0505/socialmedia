const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStratergy({
    clientID: "put-google-id-here",
    clientSecret: "client-secret-google",
    callbackURL: "http://localhost:8000/user/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google stratergy-passport', err); return; }

            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passport: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if(err){console.log('error in creating user',err); return}
                    return done(null, user);
                })
            }
        });
    }

))