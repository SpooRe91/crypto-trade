const express = require('express');
const routes = require('../routes');

module.exports = (app) => {
    app.use('/static', express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(routes);
}