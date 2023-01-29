const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const passport = require('passport');
const routes = require('./routes/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
var path = require('path');

//express

const app=express();
app.use(express.json());

//views

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Database connection 

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database= mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Connection to the database is succesful');
});

//SESSION

//const sessionStore = new MongoStore({ mongooseConnection: database, collection: 'sessions' });

const sessionStore = MongoStore.create({mongoUrl:process.env.DATABASE_URL});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
//PASSPORT

require('./passport/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

//Routes

app.use('/', routes)

const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`The App is running on port ${port}`);
})