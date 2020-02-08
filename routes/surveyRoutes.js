const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");
const defaultSort = "dateSent";

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // console.log(req.user)
    const surveys = await Survey.find({ _user: req.user.id })
      .sort(`-${req.query.sortField || defaultSort}`)
      .select({ recipients: false });

    // console.log(req.query)
    // console.log(req.params)
    // console.log(req.body)
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    console.log("testing");
    res.send("Thanks for voting");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/api/delete-survey", requireLogin, async (req, res) => {
    //console.log(req.body.Id)

    mongoose.set("useFindAndModify", false);
    //because deprecation
    //https://mongoosejs.com/docs/deprecations.html#-findandmodify-

    //it works, just try another one
    // try {
    //    await Survey.findByIdAndRemove(req.body.Id);
    // } catch (error) {
    //    console.log('error: ', error.message);
    //    res.status(400).send(err);
    // }//this method returns error after fetchSurveys run again on client

    await Survey.findByIdAndRemove(req.body.Id, function(err) {
      if (err) {
        console.log("error: ", err.message);
        res.status(400).send(err.message);
        return;
      }
      console.log("Successful deletion");
    });

    res.send({});
  });
};
