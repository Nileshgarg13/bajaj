// requestValidator.js
const validator = require('validator');

function validateRequestBody(req, res, next) {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Request body must be an array' });
    }

    // Check if all elements in the array are alphabets or numbers
    if (!data.every(item => validator.isAlphanumeric(item))) {
        return res.status(400).json({ error: 'Request body should contain only alphabets and numbers' });
    }

    next();
}

module.exports = {
    validateRequestBody,
};
