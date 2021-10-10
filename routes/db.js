require('dotenv').config();
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const methodOverride = require("method-override");
const {
  checkAuthenticated,
  checkAuthenticatedAdmin,
  checkAuthenticatedBasicOrAdmin,
  checkNotAuthenticated,
} = require("../utils/auth-checker");

const router = express.Router();
const dbValues = {
  connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
};
//Store To Manage Sessions and avoid memory leak in production
const sessionStore = new MySQLStore(dbValues); 

if (router.get('env') === 'production') {
  router.set('trust proxy', 1);
  session.cookie.secure = true;
}

router.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

//Contact form from guest user
const guestContactUsController = require("../controllers/guest-contact-us");
router.post("/guest-contact-us", guestContactUsController.guestContactUs);

//Bug report
const bugReportController = require("../controllers/bug-report");
router.post("/bug-report", bugReportController.bugReport);

//Sign up
const signUpController = require("../controllers/sign-up");
router.post("/sign-up", checkNotAuthenticated, signUpController.signUp);

//Sign in
const signInController = require("../controllers/sign-in");
router.post("/sign-in", checkNotAuthenticated, signInController.signIn);


//Save Name For Chat Room
const saveNameController = require("../controllers/save-name");
router.post("/save-name", saveNameController.saveName);

//Contact form from guest user
const contactUsController = require("../controllers/contact-us");
router.post("/contact-us", checkAuthenticated, contactUsController.contactUs);

//Update Email
const updateEmailController = require("../controllers/update-email");
router.post(
  "/update-email",
  checkAuthenticated,
  updateEmailController.updateEmail
);
router.post(
  "/update-email-admin",
  checkAuthenticatedAdmin,
  updateEmailController.updateEmail
);

//Update Username
const updateUsernameController = require("../controllers/update-username");
router.post(
  "/update-username",
  checkAuthenticated,
  updateUsernameController.updateUsername
);
router.post(
  "/update-username-admin",
  checkAuthenticatedAdmin,
  updateUsernameController.updateUsername
);

//Update Password
const updatePasswordController = require("../controllers/update-password");
router.post(
  "/update-password",
  checkAuthenticated,
  updatePasswordController.updatePassword
);
router.post(
  "/update-password-admin",
  checkAuthenticatedAdmin,
  updatePasswordController.updatePassword
);

//Add Admin
const addAdminController = require("../controllers/add-admin");
router.post("/add-admin", checkAuthenticatedAdmin, addAdminController.addAdmin);

//Ban User
const banUserController = require("../controllers/ban-user");
router.post("/ban-user", checkAuthenticatedAdmin, banUserController.banUser);

//Delete Contact Form
const deleteContactFormController = require("../controllers/delete-contact-form");
router.post(
  "/delete-contact-form",
  checkAuthenticatedAdmin,
  deleteContactFormController.deleteContactForm
);

//Mark Bug Solved
const markBugSolvedController = require("../controllers/bug-solved");
router.post(
  "/bug-solved",
  checkAuthenticatedAdmin,
  markBugSolvedController.bugSolved
);

//Mark Bug Not Solved
const markBugNotSolvedController = require("../controllers/bug-not-solved");
router.post(
  "/bug-not-solved",
  checkAuthenticatedAdmin,
  markBugNotSolvedController.bugNotSolved
);

//Delete Chat Log
const deleteChatController = require("../controllers/delete-chat");
router.post(
  "/delete-chat",
  checkAuthenticatedBasicOrAdmin,
  deleteChatController.deleteChat
);

//Download Chat Log
const downloadChatController = require("../controllers/download-chat");
router.post(
  "/download-chat",
  checkAuthenticatedBasicOrAdmin,
  downloadChatController.downloadChat
);

module.exports = router;