const passport = require("passport");
const initializePassport = require("../utils/passport-config");
const { storeUsers, users } = require("../utils/users");
const userInfo = require("../utils/user-info");
const room = require("../utils/room");

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

        //Saving user info in userInfo object included from /utils/user-info
        userInfo.setItem("id", user.id);
        userInfo.setItem("email", user.email);
        userInfo.setItem("username", user.username);
        userInfo.setItem("password", user.password);
        userInfo.setItem("role", user.role);

        const signedInRoom = room.getRoom()["signed-in"];
        const id = room.getRoom()["id"];
        const username = user.username;

        //Check if a user is signing in to basic/admin home page or signed in chat room
        if(signedInRoom === "true" && id && username){
          room.setUsername(user.username);
          req.session.save(function () {
            return res.redirect("/chat-room?id=" + id + "&username=" + username);
          }); 
        }else if (user.role === "basic") {
          req.session.save(function () {
            return res.redirect("/signed-index");
          });
        } else if (user.role === "admin") {
          req.session.save(function () {
            return res.redirect("/admin-index");
          });
        }
      });
    }
  )(req, res, next);
};
