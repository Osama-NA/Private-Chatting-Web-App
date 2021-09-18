const pool = require("./db-connection");

const users = [];

//Calling getUsers() and getAdmins() separately to set a role for each user then store them in users array as user objects
function storeUsers(){
    getUsers();
    getAdmins();
}

const getUsers =()=> {
    pool.getConnection((error, connection) => {
        if (error) console.log("Failed to get pool connection . . ." + error);

        connection.query("SELECT * FROM users", (error, results) => {
            connection.release();
            if (error) console.log("Failed to select users: " + error);

            Object.keys(results).forEach((key) => {
                let { id, email, username, password } = results[key];
                let user = {
                    id: id,
                    email: email,
                    username: username,
                    password: password,
                };
                user.role = "basic" //Setting user role
                users.push(user);
            });
        });
    });
}

const getAdmins =()=> {
    pool.getConnection((error, connection) => {
        if (error) console.log("Failed to get pool connection . . ."+ error);

        connection.query("SELECT * FROM admin", (error, results) => {
            connection.release();
            if (error) console.log("Failed to select admins: " + error);

            Object.keys(results).forEach((key) => {
                let { id, email, username, password } = results[key];
                let admin = {
                    id: id,
                    email: email,
                    username: username,
                    password: password,
                };
                admin.role = "admin" //Setting user role
                users.push(admin);
            });
        });
    });
}

module.exports = {
    storeUsers,
    users
};