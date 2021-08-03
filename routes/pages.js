const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const userInfo = require("../utils/user-info");
const {
  checkAuthenticated,
  checkAuthenticatedAdmin,
  checkNotAuthenticated,
} = require("../utils/auth-checker");
require("dotenv").config();

const router = express.Router();

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

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sign-in", checkNotAuthenticated, (req, res) => {
  res.render("sign-in");
});

router.get("/sign-up", checkNotAuthenticated, (req, res) => {
  res.render("sign-up");
});

router.get("/signed-index", checkAuthenticated, (req, res) => {
  res.render("signed-index");
});

router.get("/admin-index", checkAuthenticatedAdmin, (req, res) => {
  res.render("admin-index");
});

router.get("/add-admin", checkAuthenticatedAdmin, (req, res) => {
  res.render("add-admin");
});

router.get("/admin-edit-index", checkAuthenticatedAdmin, (req, res) => {
  res.render("admin-edit-index");
});

router.get("/edit-index", checkAuthenticated, (req, res) => {
  res.render("edit-index");
});

router.get("/contact-index", checkAuthenticated, (req, res) => {
  res.render("contact-index");
});

router.get("/sign-out", (req, res) => {
  userInfo.deleteUser();
  req.logOut();
  res.redirect("/sign-in");
});

//View Users
const viewUsersController = require("../controllers/view-users");
router.get("/view-users", checkAuthenticatedAdmin, viewUsersController.viewUsers);

module.exports = router;
