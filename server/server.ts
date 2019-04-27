// Imports
import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as account from './account';


const app = express();
app.use(bodyParser.json());
const port = 8080;


// Routes
app.post('/api/login', account.login);

app.post('/api/createAccount', account.createAccount);

//app.post('/api/usersList', (req, res) => {
	//user.find({}, (err, users) => {
		//let userMap = {};
		//users.forEach((usr) => {
			//userMap[usr._id] = usr;
		//});
           //res.send(userMap);  
	//});
//});

//app.post('/api/dropCollection', (req, res) => {
	//user.remove({}, (err) => { 
		//console.log('collection removed');
	//});
	//res.send('success');
//});

// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

