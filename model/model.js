const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String

    },
    email: {
        required: true,
        type: String,
        unique: true
    },

    isAdmin: {
        type: Boolean
    },

    isSuperAdmin: {
        type: Boolean
    },

    imageURL: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    salt: {
        type: String
    },

    hash: {
        type: String
    }

}
)


const User = mongoose.model('user', userSchema);

//module.exports = mongoose.model('Data', adminSchema);

module.exports = User;