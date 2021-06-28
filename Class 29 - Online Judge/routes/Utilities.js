const USER_NOT_AUTHENTICATED_MSG = 'User is not authenticated.';
const USER_AUTHENTICATED_MSG = 'User is already authenticated.';

function isStringNullOrEmpty(str) {
    if(!str || str.length === 0)
        return true;
    return false;
}

function isObjectNullOrEmpty(obj) {
    if(!obj || Object.keys(obj).length === 0)
        return true;
    return false;
}

function isArrayNullOrEmpty(array) {
    if(!array || array.length === 0)
        return true;
    return false;
}

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        return next();
    return res.json({ success: false, message: USER_NOT_AUTHENTICATED_MSG});
}

function isNotAuthenticated(req, res, next) {
    if(!req.isAuthenticated())
        return next();
    return res.json({ success: false, message: USER_AUTHENTICATED_MSG});
}

module.exports = { isStringNullOrEmpty, isAuthenticated, isNotAuthenticated, isObjectNullOrEmpty, isArrayNullOrEmpty };