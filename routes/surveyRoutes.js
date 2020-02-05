const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		app.post('/api/surveys/webhooks', (req, res) => {
			console.log(req.body);
			res.send({});
		});

		app.get('/api/surveys/nice', (req, res) => {
			res.send({"send":"nice"});
		});

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map((email) => ({
				email: email.trim()
			})),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Great place to send an email!
		const mailer = new Mailer(survey, surveyTemplate(survey));
		mailer.send();
	});
};
