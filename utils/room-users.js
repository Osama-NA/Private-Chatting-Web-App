const pool = require("./db-connection.js");
const room = require("./room.js");
const userInfo = require("./user-info");
const users = [];

//Loads roam users when user joins room
pool.getConnection((error, connection) => {
  if (error) console.log("Failed to get pool connection . . ." + error);

  connection.query("SELECT * FROM room_users", (error, results) => {
    connection.release();
    if (error) console.log("Failed to select room users: " + error);

    if (results) {
      Object.keys(results).forEach((key) => {
        let { id, username, room } = results[key];
        let user = {
          id: id,
          name: username,
          room: room,
        };
        users.push(user);
      });
    }
  });
});

//Join User To Chat
function userJoin(id, name, room) {
  const user = { id, name, room };

  pool.getConnection((error, connection) => {
    if (error) console.log("Failed to get pool connection . . ." + error);

    connection.query("INSERT INTO room_users SET ?", {
      id: id,
      username: name,
      room: room,
    }, (error) => {
      if (error) console.log("Failed to insert user into room_users: " + error);
    });
  })

  users.push(user);
  return user;
}

//Get Current User
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//User Leaves Chat
function userLeave(id) {
  pool.getConnection((error, connection) => {
    if (error) console.log("Failed to get pool connection . . ." + error);

    //Remove User From room_users Table
    connection.query("DELETE FROM room_users WHERE id = ?", [id], (error) => {
      if (error) console.log("Failed to delete from room_users: " + error);
    });

    //Remove Room From chat_rooms Table If Both Users Left The Room, and delete messages from messages table
    const user = users.find((user) => user.id === id);
    if (user) {
      connection.query("SELECT no_of_access FROM chat_rooms WHERE room_id = ?", [user.room],
        (error, results) => {
          if (error) console.log("Failed to select no of accesses from chat_rooms: " + error);

          if (results) {
            if (results[0]["no_of_access"] === 2) {
              connection.query("UPDATE chat_rooms SET no_of_access = 1 WHERE room_id= ?", [user.room], (error) => {
                if (error) console.log("Failed to update chat_rooms no_of_access: " + error);
              });
            } else if (results[0]["no_of_access"] === 1) {
              connection.query("DELETE FROM chat_rooms WHERE room_id = ?", [user.room], (error) => {
                if (error) console.log("Failed to delete from chat_rooms: " + error);
              });
              connection.query("DELETE FROM messages WHERE room_id = ?", [user.room], (error) => {
                connection.release();
                if (error) console.log("Failed to delete from messages: " + error);
              });
              room.deleteRoom(); //Unset all values of roomInfo in /utils/room
            }
          }
        }
      );
    }

    const index = users.findIndex((user) => user.id === id);
    room.deleteRoom(); //To disable user from joining a chat room again before creating a new room

    if (index !== -1) return users.splice(index, 1)[0];
  });
}

//Every message sent is saved in messages table until users leave room
function saveMessage(room, message) {
  pool.query("INSERT INTO messages SET ?", {
    room_id: room,
    username: message.username,
    time: message.time,
    message: message.message
  }, (error) => {
    if (error) console.log("Failed to insert into messages: " + error);
  });
}

//Gets all the temporary messages in messages table with current room_id then saves it in saved_messages table
function saveChat(id) {
  if (userInfo.getItem("email")) {
    const user = getCurrentUser(id);
    const room = user.room;
    const email = userInfo.getItem("email");
    const dateObj = new Date();
    const date = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();

    pool.getConnection((error, connection) => {
      if (error) console.log("Failed to get pool connection . . ." + error);

      //Delete previously saved messages, to not duplicate same messages
      connection.query(`DELETE FROM saved_messages WHERE room_id = '${room}' AND user_email = '${email}'`, (error) => {
        if (error) console.log("Failed to delete from saved_messages: " + error);
      });

      connection.query("SELECT * FROM messages WHERE room_id = ?", [room], (error, results) => {
        if (error) console.log("Failed to select from messages: " + error);

        if (results.length > 0) {
          Object.keys(results).forEach((key) => {
            let { room_id, username, time, message } = results[key];
            connection.query("INSERT INTO saved_messages SET ?", {
              user_email: email,
              room_id: room_id,
              username: username,
              time: time,
              message: message,
              date: year + "-" + month + "-" + date
            }, (error) => {
              connection.release();
              if (error) console.log("Failed to insert into saved_messages: " + error);
            });
          });
        }
      });
    })
    
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  saveMessage,
  saveChat
};
