exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    return res.json({ 'error': 'You are not authenticated.' });
}

exports.isNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return res.redirect("/user");
    return next();
}