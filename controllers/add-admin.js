const bcrypt = require("bcrypt");
const pool = require("../utils/db-connection.js");

exports.addAdmin = async (req, res) => {
  const email = req.body["email"];
  const username = req.body["username"];
  const password = req.body["password"];
  const confirmPassword = req.body["confirm-password"];

  if (email && username && password && confirmPassword) {
    if (validEmail(email)) {
      if (password === confirmPassword) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          pool.getConnection((error, connection) => {
            if (error) console.log("Failed to get pool connection . . .");

            connection.query("SELECT * FROM admin WHERE email = ?", [email], (error, results) => {
              if (error) {
                return res.render("add-admin", {
                  addAdminMessage: "Failed to select users emails: " + error,
                });
              }

              if (results.length === 0) {
                connection.query("INSERT INTO admin SET ?",
                  {
                    email: email,
                    username: username,
                    password: hashedPassword,
                  }, (error) => {
                    connection.release();
                    if (error) {
                      return res.render("add-admin", {
                        addAdminMessage: "Failed to add admin: " + error,
                      });
                    }

                    return res.render("add-admin", {
                      addAdminMessage: "New admin added successfully",
                    });
                  }
                );
              } else {
                return res.render("add-admin", {
                  signUpMessage: "This email is already registered",
                });
              }
            }
            );
          })
        } catch (e) {
          return res.render("add-admin", {
            addAdminMessage: e,
          });
        }
      } else {
        return res.render("add-admin", {
          addAdminMessage: "Passwords do not match",
        });
      }
    } else {
      return res.render("add-admin", {
        addAdminMessage: "Please fill in a valid email",
      });
    }
  } else {
    return res.render("add-admin", {
      addAdminMessage: "Please fill in all the required fields",
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
