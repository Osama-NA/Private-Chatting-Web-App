const {storeCounters} = require("../utils/counters");

exports.counters = (req, res, next) => {
    storeCounters();
    return next();
}