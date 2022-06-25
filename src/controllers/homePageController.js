const router = require('express').Router();

const dataSErvice = require('../services/dataService');
const { getErrorMessage } = require('../utils/errorHelpers');

//-----------------------------------HOME----------------------------------------//

router.get('/', (req, res) => {
    res.render('home', { title: "Home Page - Crypto Web" });
});

//-----------------------------------ALL CRYPTO----------------------------------------//

router.get('/allCrypto', async (req, res) => {

    try {
        let allCrypto = await dataSErvice.getAll();
        res.render('catalog', { title: "Trade Catalog", allCrypto })
    } catch (error) {
        res.render('catalog', { error: getErrorMessage(error) })
    }
});

//-----------------------------------SEARCH----------------------------------------//
router.get('/search', async (req, res) => {

    try {
        if (req.query.search) {

            let foundByName = await dataSErvice.searchAll(req.query.search);

            if (foundByName) {
                foundByName = foundByName.filter(x => x.payment === req.query.payment);
            };

            return res.render('search', { title: "Search", searched: true, foundByName })
        }
        return res.render('search', { title: "Search" });
    } catch (error) {
        res.render('search', { error: getErrorMessage(error) })
    }
});

module.exports = router;