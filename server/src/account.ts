import * as mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { isValidEmail } from './utils';

// MongoDB
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

	if (!body.email || !body.password) {
		return res.send('false');
	}

	user.findOne({ email: body.email }, (err, obj) => {
		if (obj) { // matching email is found
			argon2.verify(obj.password, body.password).then((correct) => { // check password
				if (correct) {
					res.send('true'); // why can't I use return here?
				} else {
					res.send('false');
				}
			});
		} else {
			res.send('false');
		}
	});

};


export const createAccount = (req, res) => {

	const body = req.body;
	console.log('/api/createAccount request received');

	if (!body.email || !body.password || !body.birth || !body.country) {
		return res.send('failure: fields missing');
	}
	if (!isValidEmail(body.email)) {
		return res.send('failure: invalid email');
	}

	user.findOne({ email: body.email }, (err, obj) => {
		if (obj) { // duplicate exists
			return res.send('failure: email already exists');
		}

		argon2.hash(body.password).then((hash) => {
			user.create({ email: body.email, password: hash, birth: body.birth, country: body.country }, (err, user) => {
				if (err) {
					return res.send('failure: an error occured');
				}
				return res.status(200).send('success');
			});
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
