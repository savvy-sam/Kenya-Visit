const express = require('express');
const { findByIdAndUpdate } = require('../model/model');
const router = express.Router();
const morgan = require ('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var passport = require('passport');
var crypto = require('crypto')
// const genPassword = require('..passport/authMethods').genPassword;
const genPassword = require('../passport/authMethods').genPassword;
require("dotenv").config();
const User = require('../model/model');



const secret = process.env.SECRET

module.exports = router;


//list all the Users

router.get('/users', async (req, res) => {
    try{
        const allData = await User.find();
        res.json(allData)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
});


router.post('/user/create', (req, res, next) => {

    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        hash: hash,
        salt: salt,
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        })


    res.redirect('/user/login')


});



router.get('/user/:id', async (req, res) => {
    try{
        data= await User.findById(req.params.id);
        res.status(200).json(data)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.patch('/user/update/:id', async (req, res) => {

    try{
    const id= req.params.id;
    const updatedData= req.body;
    const options = {new : true};

    const result = await Mode.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/user/delete/:id', async (req, res) => {
    try{
        id= req.params.id;
        data= await User.findByIdAndDelete(id);
        res.send(`User ${data.name} has been deleted...`)
    }

    catch(error){
        res.status(500).json({'message': error.message})
    }
})


router.get('/login', (req, res, next) => {
    res.render('login');
});


router.post('user/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));


router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.status(400).json ({Message: 'Wrong Password'});
});



















/*router.post('/admin/login', async (req, res) => {
    try{
    //check if the user exists

        const admin = await Model.findOne({email: req.body.email});

        if (admin){
            const result = await bcrypt.compare(req.body.password, admin.password);
            if (result){
                const token= await jwt.sign({username: admin.email}, secret);
                res.status(200).json({token})
            } else {
                res.status(400).json({error: "Incorrect Password!"});
            }
        }else{
         res.status(400).json({error: "This User Does not Exist"});
        }
    } catch (error){
        res.status(500).json({Message: error.message});
    }
    
})
*/


/*router.post('/admin/login', (req, res) => {
    if (!req.body.email) {
        res.json({ success: false, message: "email was not given" })
    } else if (!req.body.password) {
            res.json({ success: false, message: "Password was not given" })
    } else {passport.authenticate('local', 
    { failureRedirect: '/login-failure', successRedirect: 'login-success' });
    }
});
*/

/*
router.post('/admin/create', async (req, res) => {

    req.body.password= await bcrypt.hash(req.body.password, 10);
    req.body.passwordConfirmation = await bcrypt.hash(req.body.passwordConfirmation, 10);

    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
    })

    try {
        const adminData= await data.save();
        res.status(200).json(adminData)
    }
    catch(error){
        res.status(400).json({message: error.message})

    }
});

*/