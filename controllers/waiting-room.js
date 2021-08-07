const room = require("../utils/room");

//Generates a url with room id for second user if room id and username are set
exports.waitingRoom = (req, res) => {
  const id = room.getRoom()["id"];
  const username = room.getRoom()["username"];
  if (id && username) {
    room.setAccessOne("true");
    const url = `${req.protocol}://${req.get(
      "host"
    )}/get-name?id=${id}&second=true`;
    return res.render("waiting-room", {url: url});
  }
  return redirect(req,res);
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
