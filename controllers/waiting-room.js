const room = require("../utils/room");
const db = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");

//Generates a url with room id for second user if room id and username are set
exports.waitingRoom = (req, res) => {
  const id = room.getRoom()["id"];
  const username = room.getRoom()["username"];

  if (id && username) {

    //Checks if second user joined, if yes then redirects first user(room creator) to chat room
    db.query( "SELECT * FROM chat_rooms WHERE room_id= ?", [id], (err, results) => {
        if (results.length > 0)
          return res.redirect("/chat-room?id=" + id + "&username=" + username);
      }
    );

    room.setAccessOne("true");
    
    //URL Used By Second User To Join Chat Room
    const url = `${req.protocol}://${req.get("host")}/url-get-name?id=${id}&second=true`;
    return res.render("waiting-room", { url: url });
  }
  
  return redirect(req, res);
};

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
