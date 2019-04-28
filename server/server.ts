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
app.post('/api/usersList', account.usersList);
app.post('/api/dropCollection', account.dropCollection);


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

