const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String

    },
    email: {
        required: true,
        type: String,
        unique: true
    },

    password: {
        required: true,
        type: String
    },

    passwordConfirmation: {
        required: true,
        type: String
    }

}
)

module.exports = mongoose.model('Data', adminSchema);