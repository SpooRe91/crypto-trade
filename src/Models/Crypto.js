const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const cryptoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, 'The NAME should be at least 2 characters long!']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'The Crypto Image should start with http:// or https://!'
        }
    },
    price: {
        type: Number,
        required: true,
        min: [1, "The price must be a positive number!"]

    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'The DESCRIPTION should be at least 10 characters long!']
    },
    payment: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
            message: 'The payment type is not valid!'
        }

    },
    buyACrypto: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

});



const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;