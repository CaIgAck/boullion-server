const logger = require("./../../config/logger/index");
const logError = (req, res, next) => {


    const {status} = res

    if(status === 500) {
        res.send('Could not perform the calculation!');
        logger.error(`${status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    if(status === 400) {
        res.status(404).send("PAGE NOT FOUND");
        logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }

    return next();
};

module.exports = logError;