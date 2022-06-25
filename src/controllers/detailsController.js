const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { preloadData } = require('../middlewares/dataMiddleware');

const dataService = require('../services/dataService');
const { getErrorMessage } = require('../utils/errorHelpers');

//-----------------------------------DETAILS----------------------------------------//

router.get('/details/:id', preloadData, async (req, res) => {

    let crypto = req.data;
    let user = req.user;
    let isOwner = false;
    let isBought = false;

    try {

        let cryptoInfo = await dataService.dataInfo(req.params.id, 'buyACrypto');

        if (user && crypto && crypto.owner._id.toString() === user._id) {
            isOwner = true;
        };

        if (user && cryptoInfo.buyACrypto.some(x => x._id == req.user._id)) {
            isBought = true;
        };

        return res.render('details', { title: "Details Page", ...crypto, isOwner, isBought })
    } catch (error) {
        res.render('details', { title: "Details Page", error: getErrorMessage(error) })
    }
});

//-----------------------------------BUY----------------------------------------//
router.get('/buy/:id', isAuth, preloadData, async (req, res) => {

    try {
        await dataService.addUsersToCrypto(req.user._id, req.params.id);
        res.redirect(`/crypto/details/${req.params.id}`);
    } catch (error) {
        res.render('404', { title: "404 Page", error: getErrorMessage(error) });
    }

});

module.exports = router;