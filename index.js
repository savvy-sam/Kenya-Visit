const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();


const app=express();
app.use(express.json());

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database= mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});


database.once('connected', () => {
    console.log('Connection to the database is succesful');
});


const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`The App is running on port ${port}`);
})