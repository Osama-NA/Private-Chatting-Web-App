const db = require("../utils/db-connection.js");
const userInfo = require("../utils/user-info");
const bcrypt = require("bcrypt");

exports.updateEmail = (req, res) => {
  const email = req.body["update-email"];
  const password = req.body["password"];
  const currentEmail = userInfo.getItem("email");
  const role = userInfo.getItem("role");
  const hashedPassword = userInfo.getItem("password");
  const from = role === "basic" ? "users" : "admin";
  const page = role === "basic" ? "edit-index" : "admin-edit-index";

  if (email && currentEmail && password && from && page && hashedPassword) {
    if (validEmail(email)) {
      db.query(
        "SELECT * FROM " + from + " WHERE email = ?",
        [email],
        async (err, results) => {
          if (err) {
            return res.render(page, {
              updateEmailMessage: "Failed to select users: " + err,
            });
          }

          if (results.length === 0) {
            try {
              if (await bcrypt.compare(password, hashedPassword)) {
                db.query(
                  "UPDATE "+from+" SET email = '" +
                    email +
                    "' WHERE email = ?",
                  [currentEmail],
                  (err, results) => {
                    if (err) {
                      return res.render(page, {
                        updateEmailMessage:
                          "Failed to update user's email: " + err,
                      });
                    }
                    userInfo.setItem("email", email);
                    return res.render(page, {
                      updateEmailMessage: "Email successfully updated",
                    });
                  }
                );
              } else {
                return res.render(page, {
                  updateEmailMessage: "Incorrect Password",
                });
              }
            } catch (e) {
              return res.render(page, {
                updateEmailMessage: e,
              });
            }
          } else {
            return res.render(page, {
              updateEmailMessage: "Email already in use",
            });
          }
        }
      );
    }
  } else {
    return res.render(page, {
      updateEmailMessage: "Please fill in a valid email",
    });
  }
};

//Function which check if a given email is in a valid format
function validEmail(email) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  }

  return false;
}