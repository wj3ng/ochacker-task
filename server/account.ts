import * as mongoose from 'mongoose';
import { isValidEmail } from './utils';

// MongoDB 
mongoose.connect('mongodb://localhost:mongodb/test', {useNewUrlParser: true});
const userSchema = mongoose.Schema({
	email: String,
	password: String,
	birth: Date,
	country: String
});
const user = mongoose.model('user', userSchema);


export const login = (req, res) => {

	const body = req.body;
	console.log('/api/login request received');

	if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password')) {	
		return res.send('false');
	}

	user.findOne({ email: body.email, password: body.password }, (err, obj) => {
		if (obj) {
			return res.send('true');
		}
		return res.send('false');
	});

};


export const createAccount = (req, res) => {

	const body = req.body;
	console.log('/api/createAccount request received');

	if (!body.hasOwnProperty('email') || !body.hasOwnProperty('password') || !body.hasOwnProperty('birth') || !body.hasOwnProperty('country')) {
		return res.send('failure');
	}
	if (!isValidEmail(body.email)) {
		return res.send('failure');
	}

	user.findOne({ email: body.email }, (err, obj) => {
		if (obj) { // duplicate exists
			return res.send('failure');
		}

		user.create({ email: body.email, password: body.password, birth: body.birth, country: body.country }, (err, user) => {
			if (err) {
				return res.send('failure');
			}
			return res.status(200).send('success');
		});

	});
};


export const usersList = (req, res) => {

	console.log('/api/usersList request received');

	user.find({}, (err, users) => {
		let userMap = {};
		users.forEach((usr) => {
			userMap[usr._id] = usr;
		});
		res.send(userMap);  
	});
};


export const dropCollection = (req, res) => {

	console.log('/api/dropCollection request received');

	user.remove({}, (err) => { 
		console.log('collection removed');
	});
	res.send('success');
};
