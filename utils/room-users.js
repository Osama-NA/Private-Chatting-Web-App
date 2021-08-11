const db = require("../utils/db-connection.js");
const room = require("../utils/room.js");

const users = [];

db.query("SELECT * FROM room_users", (error, results) => {
  if (error) {
    console.log("Failed to select room users: " + error);
  }
  if(results){
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

//Join User To Chat
function userJoin(id, name, room) {
  const user = { id, name, room };

  db.query("INSERT INTO room_users SET ?", {
    id: id,
    username: name,
    room: room,
  });

  users.push(user);
  return user;
}

//Get Current User
function getCurrentUser(id) {
   return users.find((user) => user.id === id);
}

//User Leaves Chat
function userLeave(id) {
  //Remove User From room_users Table
  db.query("DELETE FROM room_users WHERE id = ?", [id]);

  //Remove Room From chat_rooms Table If Both Users Left The Room and delete messages from messages table
  const user = users.find((user) => user.id === id);
  db.query("SELECT no_of_access FROM chat_rooms WHERE room_id = ?", [user.room],
    (error, results) => {
      if(results){
        if (results[0]["no_of_access"] === 2) {
          db.query("UPDATE chat_rooms SET no_of_access = 1 WHERE room_id= ?", [
            user.room,
          ]);
        } else if (results[0]["no_of_access"] === 1) {
          db.query("DELETE FROM chat_rooms WHERE room_id = ?", [user.room]);
          db.query("DELETE FROM messages WHERE room_id = ?", [user.room]);
        }
      }
    }
  ); 

  const index = users.findIndex((user) => user.id === id);
  room.setID(undefined); //To disable user from joining a chat room again before creating a new room

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Every message sent is saved in messages table until users leave room
function saveMessage(room, message){
  db.query("INSERT INTO messages SET ?", {
    room_id: room,
    username: message.username,
    time: message.time,
    message: message.message
  });
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  saveMessage
};