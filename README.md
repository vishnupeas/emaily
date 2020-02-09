## Emaily

is a mini email surveys service. Created as a fullstack JavaScript application on React and Node. With technologies like Redux, Redux Thunk, React Router, Express, MongoDB and Bootstrap for styling.

This application implements the ability to log in using Google oauth. It uses plugin passport for the Node and connected strategy passport-google-oauth20. To send Emails used SendGrid API. And to simulate charging, the Stripe API is connected in test mode. All received data is stored on mongodb.com and managed using the mongoose plugin.

> You can view [live demo](https://emaily-recreation.herokuapp.com/)
> Because it's free heroku account, it goes to the "App is asleep" mode and may load for some time.

![](https://i.imgur.com/Rz3gDEr.gif)

Once you are logged in, you can view a list of previously created surveys and if you are looking to create a new survey, you can do it by clicking on the "+" icon on the bottom right corner and after doing this you will be directed to a survey Form filling page when you have the option to give the body,title of the email along with the **recipients which should be given as "," seperated**. On forwarding and confirming your survey in the form review page you will be given the "send" button to send your mail to the recipients

After the letters are delivered, you can click on the links placed inside and using SendGrid Webhooks the selected option is transferred to our server. Each vote adds 1 to the selected option and the site is automatically refreshed on the updates given

<p>
--->><a href="https://emaily-recreation.herokuapp.com/">Live Demo</a>
</p>

***

### Running locally

if you want to run this project on your machine, then after downloading you need to run `npm install`. Next, in the _config_ folder, create the _dev.js_ file and add all the necessary data to connect to the database and third-party services. You can see the structure in the _template.dev.js_ file. Then you need to run the `npm run dev` command - this will start both the backend server and the frontend server.

> This project was made during the Node with React: Fullstack Web Development course at udemy.com and then improved.

