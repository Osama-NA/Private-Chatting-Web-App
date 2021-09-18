const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info.js");

exports.chatLogs = (req, res) => {
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");

  //DISTINCT used to not select duplicate rows with same room_id and date
  pool.query("SELECT DISTINCT room_id, date FROM saved_messages WHERE user_email = ?", [email],
    (error, rows) => {
      if(error) console.log("Failed to select distinct room_id, data from saved_messages: " + error);

      if (rows.length > 0) {
        let chatLogs = "";

        Object.keys(rows).forEach((key) => {
          const room_id = rows[key]["room_id"];
          const date = rows[key]["date"];

          const chatLog = `<tr><td><div>${room_id}</div></td><td><div>${date}</div></td>
          <td><div class="button download"><form action="/db/download-chat" method="post">
          <input type="submit" id="download" name="download" value="${room_id}"></form>
          <i class="fas fa-file-download"></i></div></td>
          <td><div class="button delete"><form action="/db/delete-chat" method="post">
          <input type="submit" id="delete" name="delete" value="${room_id}"></form>
          <i class="fas fa-trash-alt"></i></div></td>|</tr>`;
          chatLogs += chatLog;
        });

        return redirect(chatLogs, role, res);
      }else {
        return redirect(undefined, role, res);
      }
    }
  );
};

function redirect(chatLogs, role, res) {
  if (chatLogs) {
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
