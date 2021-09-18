const bcrypt = require("bcrypt"); //Library to hash password
const pool = require("../utils/db-connection.js");
const { storeUsers, users } = require("../utils/users");

exports.signUp = async (req, res) => {
  const email = req.body.email;
  const username = req.body["sign-up-username"];
  const password = req.body["sign-up-password"];
  const confirmPassword = req.body["confirm-password"];

  if (email && username && password && confirmPassword) {
    if (validEmail(email)) {
      if (password === confirmPassword) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          pool.query( "SELECT * FROM users WHERE email = ?", [email],
            (error, results) => {
              if (error) {
                return res.render("sign-up", {
                  signUpMessage: "Failed to select users emails: " + error,
                });
              }
              if (results.length === 0) {
                pool.query( "INSERT INTO users SET ?",
                  {
                    email: email,
                    username: username,
                    password: hashedPassword,
                  }, (error) => {
                    if (error) {
                      return res.render("sign-up", {
                        signUpMessage: "Failed to register user: " + error,
                      });
                    }
                    storeUsers(); //Calling storeUsers function in /utils/users to add the newly registered user to stored users
                    res.render("sign-in", {email: email, password: password});
                  }
                );
              } else {
                return res.render("sign-up", {
                  signUpMessage: "This email is already registered",
                });
              }
            }
          );
        } catch (e) {
          return res.render("sign-up", {
            signUpMessage: e,
          });
        }
      } else {
        return res.render("sign-up", {
          signUpMessage: "Passwords do not match",
        });
      }
    } else {
      return res.render("sign-up", {
        signUpMessage: "Please fill in a valid email",
      });
    }
  } else {
    return res.render("sign-up", {
      signUpMessage: "Please fill in all the required fields",
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
