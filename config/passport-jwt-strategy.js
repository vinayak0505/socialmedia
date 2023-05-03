const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial',
}

passport.use(new JWTStratergy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function (err, User) {
        if(err){
            console.log('error in finding user from jwt',err);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))

module.exports = passport;