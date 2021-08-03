const db = require("../utils/db-connection.js");

exports.banUser = (req,res) => {
    const id = req.body["id"];
    db.query("DELETE FROM users WHERE id = ?",[id], (err, rows) => {
        if(err) return res.render("view-users", {viewUsersMessage: err});
        return res.redirect("/view-users");
    });
} 