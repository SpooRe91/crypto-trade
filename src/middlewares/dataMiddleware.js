const dataService = require('../services/dataService');

exports.preloadData = async (req, res, next) => {

    const data = await dataService.getOne(req.params.id).lean();
    req.data = data;

    next();
};

exports.isDataOwner = (req, res, next) => {

    if (req.data.owner != req.user._id) { //change the .creator to whatever is the name 
        return next({ message: 'You are not authorized', status: 401 })
    }

    next();
};