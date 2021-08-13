const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const userInfo = require("../utils/user-info");
const {
  checkAuthenticated,
  checkAuthenticatedAdmin,
  checkAuthenticatedBasicOrAdmin,
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

router.get("/", checkNotAuthenticated, (req, res) => {
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

router.get("/room-expired", (req, res) => {
  res.render("room-expired");
});

//Sign Out
router.get("/sign-out", (req, res) => {
  userInfo.deleteUser();
  req.logOut();
  res.redirect("/sign-in");
});

//Waiting Room
const waitingRoomController = require("../controllers/waiting-room");
router.get("/waiting-room", waitingRoomController.waitingRoom);

//View Users
const viewUsersController = require("../controllers/view-users");
router.get("/view-users", checkAuthenticatedAdmin, viewUsersController.viewUsers);

//Contact Forms
const contactFormsController = require("../controllers/contact-forms");
router.get("/contact-forms", checkAuthenticatedAdmin, contactFormsController.contactForms);

//Reported Bugs
const reportedBugsController = require("../controllers/reported-bugs");
router.get("/bug-reports", checkAuthenticatedAdmin, reportedBugsController.reportedBugs);

//Chat Logs
const chatLogsController = require("../controllers/chat-logs");
router.get("/admin-chat-logs", checkAuthenticatedAdmin, chatLogsController.chatLogs);
router.get("/chat-logs", checkAuthenticated, chatLogsController.chatLogs);

//Creates Room id then redirects to get-name page or waiting-room page
const createRoomController = require("../controllers/create-room");
router.get("/create-room", createRoomController.createRoom);

//When redirected to get-name page, checkSecondAccessController checks if it's the second user i.e the user who joined through link and sets the room id and access for second user 
const checkSecondAccessController = require("../controllers/check-second-access");
router.get("/url-get-name", checkSecondAccessController.checkSecondAccess, (req, res) => {
  res.render("url-get-name");
});

//Get Name
router.get("/get-name", (req, res) => {
  res.render("get-name");
});

//Save Name For Chat Room
const saveNameController = require("../controllers/save-name");
router.post("/save-name", saveNameController.saveName);

//Sign in then join chat room
const chatRoomSignInController = require("../controllers/chat-room-sign-in");
router.get("/chat-room-sign-in", chatRoomSignInController.chatRoomSignIn);

//Check if required data is available then redirect to chat room
const checkRoomDataController = require("../controllers/check-room-data");
router.get("/chat-room", checkRoomDataController.checkRoomData, (req, res) => {
  if (req.isAuthenticated()) {
    res.render("signed-chat-room");
  } else {
    res.render("chat-room");
  }
});

module.exports = router;
