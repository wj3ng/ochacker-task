// Imports
import express from "express";
import mongoose from "mongoose"; 


const app = express();
const port = 8080;


// Functions 
const isValidEmail = (iStr) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(iStr);


// MongoDB 
mongoose.connect('mongodb://localhost:mongodb', {useNewUrlParser: true});

const userSchema = new Schema({
	email: String,
	password: String
});
const user = mongoose.model('user', userSchema);


// Routes
app.post('/login', (req, res) => {

});

app.post('/createAccount', (req, res) => {

});


// Listen
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

