const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sgMail_API = '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'; 

const app = express();

sgMail.setApiKey(sgMail_API);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
	res.render('index',{title: 'Computer Not Working?'});
});

app.get('/about', (req, res)=> {
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', (req, res)=>{
	const msg = {
		to: ['kawsarm104@gmail.com','mdnuruddin043@gmail.com'],
		from: {
			name: 'Nuruddin',
			email : 'mdnuruddin04051996@gmail.com'
		}, // Use the email address or domain you verified above
		subject: 'Sending with Twilio SendGrid is Fun',
		text: 'This is just a random mail to check if it is working or not as I am a beginner in this area. Hope I will be succss one day and I have to]',
		html: '<strong>This is just a random mail to check if it is working or not as I am a beginner in this area. Hope I will be succss one day and I have to]</strong>',
	  };
	  //ES6
	  sgMail
		.send(msg)
		.then(() => {res.redirect('/');}, error => {
		  console.error(error);
		  
	  
		  if (error.response) {
			console.error(error.response.body)
			
		  }
		});

	});
	/*transporter.sendMail(mailOptions, (error, info)=>{
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});
*/
app.listen(3000);
console.log('Server is running on port 3000...');