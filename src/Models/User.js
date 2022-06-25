const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: [5, 'The USERNAME should be at least 5 characters long!']
    },
    email: {
        type: String,
        required: true,
        minlength: [10, 'The EMAIL should be at least 10 characters long!']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'The PASSWORD should be at least 4 characters long!']
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;