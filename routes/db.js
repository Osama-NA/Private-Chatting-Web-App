require("dotenv").config();
const express = require("express");
const passport = require("passport");
const initializePassport = require("../utils/passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const router = express.Router();

//Function to initializing passport authentication
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const { storeUsers, users } = require("../utils/users");
//Calling storeUsers() in /utils/users to store each user and use users variable
storeUsers();

router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

//Sign in authentication
router.post("/sign-in", checkNotAuthenticated, function (req, res, next) {
  passport.authenticate("local", {failureFlash: true}, function (err, user, info) {
    if (err) {
        console.log(err);
      return next(err);
    }
    
    if (!user) {
      return res.render("sign-in", {signInMessage: info.message});
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
  })(req, res, next);
});

//Contact form from guest user
const guestContactUsController = require("../controllers/guest-contact-us");
router.post("/guest-contact-us", guestContactUsController.guestContactUs);

//Bug report
const bugReportController = require("../controllers/bug-report");
router.post("/bug-report", bugReportController.bugReport);

//Sign up
const signUpController = require("../controllers/sign-up");
router.post("/sign-up", checkNotAuthenticated, signUpController.signUp);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/signed-index");
  }

  next();
}

module.exports = router;
