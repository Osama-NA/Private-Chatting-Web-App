const room = require("../utils/room");

//checks whether the room id and username are set and checks if access one or two (user-1/2) are set, 
//if any is not set then user is redirected to home page otherwise to chat room
exports.checkRoomData = (req, res, next) => {
    const roomData = room.getRoom();
    const roomID = roomData["id"];
    const roomUsername = roomData["username"];
    const roomAccess = roomData["access-one"]
      ? roomData["access-one"]
      : roomData["access-two"]
      ? roomData["access-two"]
      :"false";

    if(roomID && roomAccess && roomUsername){
        return next();
    }

    return redirect(req,res);
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