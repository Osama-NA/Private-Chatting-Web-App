const db = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info.js");

exports.chatLogs = (req, res) => {
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");

  //DISTINCT used to not select duplicate rows with same room_id and date
  db.query(
    "SELECT DISTINCT room_id, date FROM saved_messages WHERE user_email = ?",
    [email],
    (err, rows) => {
      if (rows.length > 0) {
        let chatLogs = "";
        Object.keys(rows).forEach((key) => {
          const room_id = rows[key]["room_id"];
          const date = rows[key]["date"];

          const chatLog = `<tr><td><div>${room_id}</div></td><td><div>${date}</div></td>
                <td><div class="button download"><i class="fas fa-file-download"></i></div></td>
                <td><div class="button delete"><i class="fas fa-trash-alt"></i></div></td>|</tr>`;
          chatLogs += chatLog;
        });
        return redirect(chatLogs, role, res);
      }else {
        return redirect("", role, res);
      }
    }
  );
};

function redirect(chatLogs, role, res) {
  if (chatLogs.length > 0) {
    if (role === "admin") {
      return res.render("admin-chat-logs", { chatLogs: chatLogs });
    } else if (role === "basic") {
      return res.render("chat-logs", { chatLogs: chatLogs });
    }
  }else {
    if (role === "admin") {
      return res.render("admin-chat-logs");
    } else if (role === "basic") {
      return res.render("chat-logs");
    }
  }
}
