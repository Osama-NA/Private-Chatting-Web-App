const pool = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");
const bcrypt = require("bcrypt");

exports.updatePassword = async (req, res) => {
  const password = req.body["password"];
  const newPassword = req.body["new-password"];
  const confirmPassword = req.body["confirm-password"];
  const email = userInfo.getItem("email");
  const role = userInfo.getItem("role");
  const hashedPassword = userInfo.getItem("password");
  const from = role === "basic" ? "users" : "admin";
  const page = role === "basic" ? "edit-index" : "admin-edit-index";

  if (email && newPassword && password && confirmPassword && hashedPassword && from && page) {
    try {
        if (await bcrypt.compare(password, hashedPassword)) {
            if(newPassword === confirmPassword){
                const newHashedPassword = await bcrypt.hash(newPassword, 10);
                pool.query("UPDATE "+from+" SET password = '" + newHashedPassword + "' WHERE email = ?",
                  [email], (error) => {
                    if (error) {
                      return res.render(page, {
                        updatePasswordMessage:
                        "Failed to update user's username: " + error,
                      });
                    }
                    
                    userInfo.setItem("password", newHashedPassword);
                    return res.render(page, {
                      updatePasswordMessage: "Password successfully updated",
                    });
                  }
                );
            }else{
                return res.render(page, {
                    updatePasswordMessage: "Passwords do not match",
                  });
            }
        } else {
          return res.render(page, {
            updatePasswordMessage: "Incorrect Password",
          });
        }
      } catch (e) {
        return res.render(page, {
          updatePasswordMessage: e,
        });
    }
  }
};