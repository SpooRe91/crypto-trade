const { getErrorMessage } = require("../utils/errorHelpers");

exports.modelValidator = (Model, path) => async (req, res, next) => {
    try {
        await Model.validate(req.body);
        next();
    } catch (error) {
        res.render(path, { ...req.body, error: getErrorMessage(error) })
    };
}