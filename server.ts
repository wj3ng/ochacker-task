// Imports
import express from "express";


const app: express.Application = express();
const port = 8080;


// Functions 
isValidEmail = (iStr: string) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(iStr);


// TODO: MongoDB 


// Routes
app.post("/login", (req,res) => {

});

app.post("/createAccount", (req,res) => {

});


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

