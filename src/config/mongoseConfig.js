const mongoose = require('mongoose');
const { DB_CONNECTION_STRING } = require('./constants')

exports.connecter = () => mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('DB error', err);
    });
