const pool = require("../utils/db-connection.js");

// The row with counter_name 'rooms_created_count' in table counters in database 
// is incremented by one whenever a new chat room is created
exports.roomsCreatedCount = (req, res, next) => {
    const column = 'rooms_created_count';
    const updateQuery = `UPDATE counters SET counter_value = counter_value + 1 WHERE counter_name = '${column}'`;
    pool.query(updateQuery, (error) => console.log(error ? error : "New room created"));
    return next();
}