const room = require("../utils/room");
const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");

//Used to set a value in localStorage from inside a query callback
//To be used in next middleware to check if a user is joining expired room
const localStorage = require("localStorage");

//checks whether the room id and username are set and checks if access one or two (user-1/2) are set,
//if any is not set then user is redirected to home page otherwise to chat room
exports.checkRoomData = (req, res, next) => {
  const roomData = room.getRoom();
  const roomID = roomData["id"];
  const roomUsername = roomData["username"];
  const roomAccess =
    roomData["access-two"] === "true"
      ? "user two"
      : roomData["access-one"] === "true"
        ? "user one"
        : undefined;

  if (roomID && roomAccess && roomUsername) {
    createOrUpdateRoom(roomID, roomAccess, res);
    room.setAccessTwo("false"); //Needed in localhost server to allow access by user one
    return next();
  }

  return redirect(req, res);
};

//If access by user one, update access_one in chat rooms table 
//If access by user two, inset new room chat rooms table with access_one set to 0 and access_two set to 1
function createOrUpdateRoom(roomID, roomAccess, res) {
  pool.getConnection((error, connection) => {
    if (error) console.log("Failed to get pool connection . . ." + error);

    if (roomAccess == "user one") {
      connection.query("UPDATE chat_rooms SET access_one = 1 WHERE room_id= ?", [roomID], (error) => {
        if (error) console.log("Failed to update chat_rooms access_one: " + error);

        connection.query("UPDATE chat_rooms SET no_of_access = 2 WHERE room_id= ?", [roomID], (error) => {
          connection.release();
          if (error) console.log("Failed to update chat_rooms no_of_access: " + error);

          console.log("User one joined chat room");
        });
      });
    } else if (roomAccess == "user two") {
      //Before Setting access by user two, check if chat room is full
      //if yes, then set in local storage a value to be used in next 
      //middleware to redirect used to 'room expired' page
      connection.query("SELECT access_two,access_one FROM chat_rooms WHERE room_id= ?", [roomID], (error, results) => {
        if (error) console.log("Failed to select access_two, access_one from chat_rooms: " + error);

        if (results.length > 0) {
          try{
            localStorage.setItem("joining expired room", true);
          }catch(e){
            console.log("Routing " + e);
          }
        }else if (room.getRoom()["id"] != undefined) {
          connection.query("INSERT INTO chat_rooms SET ?", 
            { room_id: roomID, access_one: 0, access_two: 1, no_of_access: 1 }, 
            (error) => {
            connection.release();
            if (error) console.log("Failed to insert into chat_rooms: " + error);

            console.log("User two joined chat room");
          });
        }
      });
    }
  })
}

function redirect(req, res) {
  if (req.isAuthenticated()) {
    let role = userInfo.getItem("role");
    if (role === "basic") {
      return res.redirect("/signed-index");
    }
    if (role === "admin") {
      return res.redirect("/admin-index");
    }
  }
  return res.redirect("/");
}
