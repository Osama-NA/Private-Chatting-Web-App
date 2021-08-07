const db = require("../utils/db-connection.js");

exports.viewUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {

        if(rows.length > 0){
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
            return res.render("view-users", {users: users});
        }else{
            return res.render("view-users");
        }
    });
}