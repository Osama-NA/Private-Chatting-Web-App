const pool = require("../utils/db-connection.js");

exports.banUser = (req,res) => {
    const id = req.body["id"];

    pool.query("DELETE FROM users WHERE id = ?",[id], (error) => {
        if(error) return res.render("view-users", {viewUsersMessage: error});
        return res.redirect("/view-users");
    });
} 