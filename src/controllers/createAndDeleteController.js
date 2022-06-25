const router = require('express').Router();

const Crypto = require('../Models/Crypto');
const { isAuth } = require('../middlewares/authMiddleware');
const { modelValidator } = require('../middlewares/modelValidatorMiddleware');
const { preloadData, isDataOwner } = require('../middlewares/dataMiddleware');

const { getErrorMessage } = require('../utils/errorHelpers');

const dataService = require('../services/dataService');

//-----------------------------------CREATE GET----------------------------------------//
router.get('/create', isAuth, (req, res) => {

    try {
        res.render('create', { title: "Create Page" })
    } catch (error) {

        res.render('home', { error: getErrorMessage(error) })
    }

});
//-----------------------------------CREATE POST----------------------------------------//

router.post('/create', isAuth, modelValidator(Crypto, 'create'), async (req, res) => {

    const currentCrypto = { ...req.body, owner: req.user._id }

    try {

        await dataService.create(currentCrypto);
        res.redirect('/allCrypto');
    } catch (error) {
        res.render('create', { title: "Create Page", ...req.body, error: getErrorMessage(error) })
    }

});

//-----------------------------------EDIT GET----------------------------------------//
router.get('/edit/:id', isAuth, preloadData, (req, res) => {

    try {
        if (req.user._id !== req.data.owner._id.toString()) {
            throw {
                message: 'You are not authorized!'
            }
        };
        res.render('edit', { title: "Edit Page", ...req.data })

    } catch (error) {
        res.render('404', { title: "404 Page", error: getErrorMessage(error) });
    }

});


//-----------------------------------EDIT POST----------------------------------------//
router.post('/edit/:id', isAuth, preloadData, isDataOwner, async (req, res) => {

    try {
        await dataService.edit(req.params.id, req.body);
        res.redirect(`/crypto/details/${req.params.id}`)
    } catch (error) {
        res.render('edit', { title: "Edit Page", ...req.body, error: getErrorMessage(error) })
    }

});

//-----------------------------------DELETE----------------------------------------//

router.get('/delete/:id', isAuth, preloadData, isDataOwner, async (req, res) => {

    try {
        await dataService.delete(req.params.id);
        res.redirect('/allCrypto');
    } catch (error) {
        res.render('404', { title: "404 Page", error: getErrorMessage(error) });
    }

});


module.exports = router;