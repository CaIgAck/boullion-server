const jwt = require("jsonwebtoken");
const {errorResponse} = require("../../helpers/utils");

const config = process.env;

const verifyToken = (req, res, next) => {
    const path = req._parsedUrl.path
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if(path === '/auth/registration' || path === '/auth/login' || path === '/Survey') {
        return next()
    }
    if (!token) {
        const error = {
            message: 'Токен обязателен для аунтефикации',
            error: 403
        }
        return res.status(403).json(errorResponse({error}));
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;