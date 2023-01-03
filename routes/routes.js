const express = require('express');
const { findByIdAndUpdate } = require('../model/model');
const router = express.Router();
const morgan = require ('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.SECRET

module.exports = router;
const Model = require('../model/model');

//list all the admins

router.get('/admins', async (req, res) => {
    try{
        const allData = await Model.find();
        res.json(allData)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
});


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

router.get('/admin/:id', async (req, res) => {
    try{
        data= await Model.findById(req.params.id);
        res.status(200).json(data)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.patch('/admin/update/:id', async (req, res) => {

    try{
    const id= req.params.id;
    const updatedData= req.body;
    const options = {new : true};

    const result = await Model.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/admin/delete/:id', async (req, res) => {
    try{
        id= req.params.id;
        data= await Model.findByIdAndDelete(id);
        res.send(`User ${data.name} has been deleted...`)
    }

    catch(error){
        res.status(500).json({'message': error.message})
    }
})

router.post('/admin/login', async (req, res) => {
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

