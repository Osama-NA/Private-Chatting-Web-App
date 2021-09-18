const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");
const bcrypt = require("bcrypt");

exports.updateUsername = async (req, res) => {
  const username = req.body["update-username"];
  const password = req.body["password"];
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");
  const hashedPassword = userInfo.getItem("password");
  const from = role === "basic" ? "users" : "admin";
  const page = role === "basic" ? "edit-index" : "admin-edit-index";

  if (email && username && password && from && page && hashedPassword) {
    try {
      if (await bcrypt.compare(password, hashedPassword)) {
        pool.query(
          "UPDATE "+from+" SET username = '" + username + "' WHERE email = ?",
          [email], (error) => {
            if (error) {
              return res.render(page, {
                updateUsernameMessage:
                "Failed to update user's username: " + error,
              });
            }
            userInfo.setItem("username", username);
            return res.render(page, {
              updateUsernameMessage: "Username successfully updated",
            });
          }
        );
      } else {
        return res.render(page, {
          updateUsernameMessage: "Incorrect Password",
        });
      }
    } catch (e) {
      return res.render(page, {
        updateUsernameMessage: e,
      });
    }
  }
};
