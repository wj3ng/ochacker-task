// Imports
import * as express from 'express';
import * as bodyParser from 'body-parser'
import { router } from './routers/api';


const app = express();
app.use(bodyParser.json());
const port = 8080;


app.use('/api', router);


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

