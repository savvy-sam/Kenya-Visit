const express = require('express');
const router = express.Router();
module.exports = router;

//get all the admins

router.get('/admins', (req, res) => {
    res.send('get all api')
});

router.post('/admin/create', (req, res) => {
    res.send('Create Admin')
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

