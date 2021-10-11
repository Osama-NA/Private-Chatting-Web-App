const pool = require("../utils/db-connection.js");
const counters = [];

const storeCounters = () => {
    const selectQuery = "SELECT * FROM counters";
    pool.query(selectQuery, (error, results) => {
        if (error) console.log("Failed to select counters: " + error);
        if (results) {
            counters.push(results[0].counter_value);
            counters.push(results[1].counter_value);
        }
    })
}

module.exports = {
    storeCounters,
    counters
};