const db = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info.js");

exports.deleteChat = (req, res) => {
  const id = req.body.delete;
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");

  if (id && email) {
    db.query(`DELETE FROM saved_messages WHERE room_id = '${id}' AND user_email = '${email}'`);
    return redirect(role, res);
  }
};

function redirect(role, res) {
  if (role === "admin") {
    return res.redirect("/admin-chat-logs");
  } else if (role === "basic") {
    return res.redirect("/chat-logs");
  }
}
