const db = require("./db-connection");

const users = [];

//Calling getUsers() and getAdmins() separately to set a role for each user then store them in users array as user objects
function storeUsers(){
    getUsers();
    getAdmins();
}

const getUsers =()=> {
    db.query("SELECT * FROM users", (error, results) => {
        if(error){
            console.log("Failed to select users: "+ error);
        }
        Object.keys(results).forEach((key) => {
            let {id, email, username, password} = results[key];
            let user = {
                id: id,
                email: email,
                username: username,
                password: password,
            };
            user.role= "basic" //Setting user role
            users.push(user);
        });
    })
}

const getAdmins =()=> {
    db.query("SELECT * FROM admin", (error, results) => {
        if(error){
            console.log("Failed to select admins: "+ error);
        }
        Object.keys(results).forEach((key) => {
            let {id, email, username, password} = results[key];
            let admin = {
                id: id,
                email: email,
                username: username,
                password: password,
            };
            admin.role= "admin" //Setting user role
            users.push(admin);
        });
    })
}

module.exports = {
    storeUsers,
    users
};