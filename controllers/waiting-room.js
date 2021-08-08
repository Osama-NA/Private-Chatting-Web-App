const room = require("../utils/room");
const db = require("../utils/db-connection.js");

//Generates a url with room id for second user if room id and username are set
exports.waitingRoom = (req, res) => {
  const id = room.getRoom()["id"];
  const username = room.getRoom()["username"];
  if (id && username) {
    const userJoined = checkUserTwoJoined(id, res);
    if(userJoined === true) return res.redirect("/chat-room");
    room.setAccessOne("true");
    const url = `${req.protocol}://${req.get("host")}/get-name?id=${id}&second=true`;
    return res.render("waiting-room", {url: url});
  }
  return redirect(req,res);
}

//Checks if second user joined, if yes then redirects first user(room creator) to chat room
function checkUserTwoJoined(id, res){
  db.query("SELECT access_two FROM chat_rooms WHERE room_id= ?", [id], (err,results) => {
    if(results.length > 0) return true;
  });
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
