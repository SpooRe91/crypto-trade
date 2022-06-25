const router = require('express').Router();
const User = require('../Models/User');

const authService = require('../services/authService');

const { SESSION_NAME } = require('../config/constants');
const { isAuth, isNotLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { modelValidator } = require('../middlewares/modelValidatorMiddleware');

//-----------------------------------REGISTER GET----------------------------------------//
router.get('/register', isNotLogged, (req, res) => {
    res.render('auth/register', { title: "Register Page - Crypto Web" })
});

//-----------------------------------REGISTER POST----------------------------------------//
router.post('/register', isNotLogged, modelValidator(User, 'auth/register'), async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const created = await authService.register({ username, email, password, rePassword });
        const token = await authService.createToken(created);

        if (token) {

            res.cookie(SESSION_NAME, token, { httpOnly: true });//automatic login after registration
            return res.redirect('/');
        };

    } catch (error) {

        return res.render('auth/register', { error: getErrorMessage(error) });
    };
});


//-----------------------------------LOGIN GET----------------------------------------//
router.get('/login', isNotLogged, (req, res) => {
    res.render('auth/login', { title: "Login Page - Crypto Web" });
});


//-----------------------------------LOGIN POST----------------------------------------//
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        if (!token) {
            throw {
                message: 'Unable to login with the given credentials!'
            };
        };

        res.cookie(SESSION_NAME, token, { httpOnly: true });

        if (user) {
            return res.redirect('/');
        }

    } catch (error) {
        return res.render('auth/login', { error: getErrorMessage(error) });
    };
});


//-----------------------------------LOGOUT----------------------------------------//
router.get('/logout', isAuth, (req, res) => {

    try {
        res.clearCookie(SESSION_NAME);
        res.redirect('/');
    } catch (error) {
        return res.render('home', { error: getErrorMessage(error) })
    }
});

module.exports = router;