const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// called after the done is used after retriving the data from the user inside the passport.use
// the user mentioned in here is the data that we give when call the done inside the passport.use
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(excistingUser => {
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
