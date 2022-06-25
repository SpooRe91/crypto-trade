const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { saltRounds } = require('../config/constants');
const { secret } = require('../config/env');

exports.register = async ({ username, email, password, rePassword }) => {

    const existingEmail = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existingEmail) {
        throw {
            message: 'Email is taken!'
        }
    };

    if (password !== rePassword) {
        throw {
            message: "The repeat password should be equal to the password!"
        }
    }

    let hashedPass = await bcrypt.hash(password, saltRounds);
    let createdUser = User.create({
        username,
        email,
        password: hashedPass,
    });
    return createdUser;

};

exports.login = async (email, password) => {
    let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw {
            message: 'Incorrect username or password'
        }
    };
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Incorrect username or password'
        };
    };

    return user;
};

exports.createToken = (user) => {

    const payload = { _id: user._id, email: user.email };
    const options = { expiresIn: "2d" };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (error, decodedToken) => {

            if (error) {
                return reject(error);
            };
            resolve(decodedToken);
        });
    });
}

exports.isOwner = (house, user) => {

    if (!house.owner) {
        return false;
    } else if (house.owner.toString() === user._id) {
        return true;
    } else {
        return false;
    }
}

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
};
exports.getUserById = async (id) => {
    const user = await User.findOne({ _id: id });
    return user;
}