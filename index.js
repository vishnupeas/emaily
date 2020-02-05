const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//mongoose connecting to the mongodb database that we define and making use of the User model class
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
require('./models/User');
require('./models/Survey');

//passport with the help of the mongoose and the model classses defined gets the passport defined
require('./services/passport');

//maxAge is in milliseconds
const app = express();
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

//Makes use of the passport to handle data fow
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//Express will serve up the productioin assets like main.js and main.class
	app.use(express.static('client/build')); // matches for the static file inside builded file

	//Express will serve up the index.js for the routers
	//express comes to this portion after looking at the routes it has and the routes inside the client and build
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
