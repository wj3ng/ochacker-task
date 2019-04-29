// Imports
import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose';
import { router } from './routers/api';


const app = express();
app.use(bodyParser.json());
const port = 8080;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:mongodb/test', {useNewUrlParser: true});


app.use('/api', router);


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

