const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

//mongoose connecting to the mongodb database that we define and making use of the User model class
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
require("./models/User");

//passport with the help of the mongoose and the model classses defined gets the passport defined
require("./services/passport");

//maxAge is in milliseconds
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Makes use of the passport to handle data fow
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
