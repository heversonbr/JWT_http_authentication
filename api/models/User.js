const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {

        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        detault: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);