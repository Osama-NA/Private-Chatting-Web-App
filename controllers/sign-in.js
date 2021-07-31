const passport = require("passport");
const initializePassport = require("../utils/passport-config");
const { storeUsers, users } = require("../utils/users");

//Calling storeUsers() in /utils/users to store each user and use users variable
storeUsers();

//Function to initializing passport authentication
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

exports.signIn = (req, res, next) => {
  passport.authenticate(
    "local",
    { failureFlash: true },
    function (err, user, info) {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (!user) {
        return res.render("sign-in", { signInMessage: info.message });
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        if (user.role === "basic") {
          req.session.save(function () {
            res.redirect("/signed-index");
          });
        } else if (user.role === "admin") {
          req.session.save(function () {
            res.send("/admin-index");
          });
        }
      });
    }
  )(req, res, next);
};
