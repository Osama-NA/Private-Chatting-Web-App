require("dotenv").config();
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const {
  checkAuthenticated,
  checkAuthenticatedAdmin,
  checkNotAuthenticated,
} = require("../utils/auth-checker");

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

module.exports = router;
