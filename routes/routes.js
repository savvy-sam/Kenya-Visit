const express = require('express');
const router = express.Router();
module.exports = router;
const Model = require('../model/model');

//get all the admins

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

router.get('/admin/:id', (req, res) => {
    res.send(`${req.params.id}`)
});

router.patch('/admin/:id', (req, res) => {
    res.send('Update individual admin')
});

router.delete('/admin/:id', (req, res) => {
    res.send('Delete the admin')
})



