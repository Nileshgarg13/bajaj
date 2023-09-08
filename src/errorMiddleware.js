// errorMiddleware.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}

function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Route Not Found,Plz check api' });
}

module.exports = {
    errorHandler,
    notFoundHandler,
};
