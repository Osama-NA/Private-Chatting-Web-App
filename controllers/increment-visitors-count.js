const pool = require("../utils/db-connection.js");

// local storage is used here to avoid incrementing app_visits_count on every join by same user
const localStorage = require("localStorage");

// The row with counter_name 'app_visits_count' in table counters in database 
// is incremented by one on every new visit to the application
exports.incrementVisitorsCount = (req, res, next) => {
    if (!(localStorage.getItem('first visit') === 'false')) {
        const column = 'app_visits_count';
        const updateQuery = `UPDATE counters SET counter_value = counter_value + 1 WHERE counter_name = '${column}'`;
        pool.query(updateQuery, (error) => console.log(error ? error : "New visit"));
        localStorage.setItem('first visit', false);
        return next();
    }
    next();
}