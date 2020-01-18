const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const key = require("../config/keys");

class Mailer extends helper.Mail {}

export default Mailer;
