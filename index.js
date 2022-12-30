const express = require('express');
const mongoose= require('mongoose');

const app=express();

app.use(express.json());


const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`The App is running on port ${port}`);
})