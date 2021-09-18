const pool = require("../utils/db-connection.js");

exports.viewUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, rows) => {
        if(error) console.log("Failed to select from users: " + error);

        if (rows.length > 0) {
            let users = "";
            Object.keys(rows).forEach(key => {
                const username = rows[key]["username"];
                const email = rows[key]["email"];
                const id = rows[key]["id"];
                const user = `<tr><td><div>` + id + `</div></td><td><div>`
                    + username + `</div></td><td><div>`
                    + email + `</div></td><td id= 'delete-col'>`
                    + `<img src='/images/delete.png' alt='delete'><form action= '/db/ban-user' method='post'>`
                    + `<input type='submit' id= 'delete' name='id' value= '`
                    + id + `' /></form></td>|</tr>`;
                users += user;
            });
            return res.render("view-users", { users: users });
        } else {
            return res.render("view-users");
        }
    });
}