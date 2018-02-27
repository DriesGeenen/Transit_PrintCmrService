exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.adminRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "admin") {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized administrator!' });
    }
};

exports.adminOrSelfRequired = function(req, res, next) {
    if (req.user && (req.user.data.role === "admin" || req.user.data._id === req.params.id)) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user or administrator!' });
    }
};

exports.authServiceRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "authservice") {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized!'});
    }
};