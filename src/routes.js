const express = require('express');
const router = express.Router();

const homePageController = require('./controllers/homePageController');
const authController = require('./controllers/authController');
const createAndDeleteController = require('./controllers/createAndDeleteController');
const detailsController = require('./controllers/detailsController');

router.use(homePageController);
router.use('/auth', authController);
router.use('/crypto', createAndDeleteController, detailsController)
router.get('*', (req, res) => {
    res.render('404')
});
module.exports = router;