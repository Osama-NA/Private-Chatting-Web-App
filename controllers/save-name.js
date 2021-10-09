const room = require("../utils/room");

exports.saveName = (req, res) => {
  const name = req.body["name"];
  const id = room.getRoom()["id"];

  const urlAccess = room.getRoom()["access-two"];

  //if url access is set then redirect second user to chat room otherwise redirect first user to waiting room
  if (urlAccess === "true") {
    room.setUsernameTwo(name);
    return res.redirect("/chat-room?id="+id+"&username="+name);
  }

  room.setUsernameOne(name);
  return res.redirect("/waiting-room");
};