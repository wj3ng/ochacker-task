// Imports
import * as express from 'express';
import * as mongoose from 'mongoose';


const app = express();
const port = 8080;


// Functions 
const isValidEmail = (iStr) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(iStr);


// MongoDB 
mongoose.connect('mongodb://localhost:mongodb/test', {useNewUrlParser: true});
const userSchema = mongoose.Schema({
	email: String,
	password: String,
	birth: Date,
	country: String
});
const user = mongoose.model('user', userSchema);


// Routes
app.post('/api/login', (req, res) => {
	const body = req.body;

	if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password')) {	
		return res.send('false');
	}

	user.findOne({ email: body.email, password: body.password }, (err, obj) => {
		if (obj) {
			return res.send('true');
		}
		return res.send('false');
	});
});

app.post('/api/createAccount', (req, res) => {
	const body = req.body;

	if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password') || !body.hasOwnProperty('birth') || !body.hasOwnProperty('country')) {
		return res.send('failure');
	}
	if (isValidEmail(body.email)) {
		return res.send('failure');
	}

	user.create({ email: body.email, password: body.password, birth: body.birth, country: body.country }, (err, user) => {
		if (err) {
			return res.send('failure');
		}
		return res.status(200).send('success');
	});
});


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

