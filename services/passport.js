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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const excistingUser = await User.findOne({ googleId: profile.id });

      console.log(excistingUser);
      //checking out what comes when the user is new and is being registered

      if (excistingUser) {
        console.log("--- EXCISTING USER ---");
        console.log(excistingUser);
        return done(null, excistingUser);
      }

      const user = await new User({
        googleId: profile.id,
        googleName: profile.displayName,
        googleEmail: profile.emails[0].value
      }).save();

      console.log("--- NEW USER ---");
      console.log(user);
      done(null, user);
    }
  )
);
