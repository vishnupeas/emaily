const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ google: profile.id }).then(excistingUser => {
        if (excistingUser) {
          console.log(excistingUser);
          //get to the cookie stuff
          done(null, excistingUser);
        } else {
          new User({
            googleId: profile.id,
            googleName: profile.displayName,
            googleEmail: profile.emails[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
