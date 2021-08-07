const room = require("../utils/room");

exports.saveName = (req, res) => {
  const name = req.body["name"];
  room.setUsername(name);

  const urlAccess = room.getRoom()["access-two"];

  //if url access is set then redirect second user to chat room otherwise redirect first user to waiting roomData
  
  if (urlAccess) {
    return res.redirect("/chat-room")
  }

  return res.redirect("/waiting-room");
};
