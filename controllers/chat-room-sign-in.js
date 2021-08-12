const room = require("../utils/room");

//When a user signs in before joining a chat room
exports.chatRoomSignIn = (req, res) => {
    room.setSignedIn("true");
    return res.redirect("/sign-in");
}