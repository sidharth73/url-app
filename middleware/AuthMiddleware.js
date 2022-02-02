const jwt = require('jsonwebtoken')

const AuthMiddleware = (req,res,next) => {
    if (req.headers['auth'] === undefined) {
        return res.status(406).json({ err:"ACCESS DENIED" })
    }
    const token = req.headers['auth'];

    try {
        const decoded = jwt.verify(token,'required');
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(406).json({ err:"Invalid Token" })
    }
}

module.exports = AuthMiddleware;