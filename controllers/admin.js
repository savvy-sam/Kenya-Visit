require ('dotenv').config ();

const jwt = require('jsonwebtoken');
const { rawListeners } = require('../model/model');

const isLogggedIn = async (req, res, next) => {
    try{
        //check if the header exists 
        if (req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];

            if (token) {
                const payload = await jwt.verify(token, process.env.SECRET);

                if (payload){
                    req.user = payload;

                    next();

                } else{
                    res.status(400).json({error: 'Token Verification failed'});
                }

            
            } else {
                res.status(400).json({error: 'Malformed Authorization header'})
            }

        } else{
            res.status(400).json({error: 'No authorization Token'})
        }
    }

    catch (error) {
        res.status(400).json({error})

    };
};

module.exports = {
    isLogggedIn()
}