const crypto = require("crypto");
const userInfo = require("../utils/user-info");
const room = require("../utils/room");

exports.createRoom = (req, res) => {
  //generate ID using crypto library
  const id = crypto.randomBytes(16).toString("hex");

  room.setID(id);
  
  //if user is not authenticated redirect to get name page
  if (req.isAuthenticated()) {
    const user = userInfo.getItem("username");
    room.setUsernameOne(user);
    return res.redirect("/waiting-room");
  }
  
  return res.redirect("/get-name");
};
