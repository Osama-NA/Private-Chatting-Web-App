require("dotenv").config();
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { checkAuthenticated, checkAuthenticatedAdmin, checkNotAuthenticated } = require('../utils/auth-checker');

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

//Sign in
const signInController = require("../controllers/sign-in");
router.post("/sign-in", checkNotAuthenticated, signInController.signIn);

//Contact form from guest user
const contactUsController = require("../controllers/contact-us");
router.post("/contact-us", contactUsController.contactUs);

//Contact form from guest user
const guestContactUsController = require("../controllers/guest-contact-us");
router.post("/guest-contact-us", guestContactUsController.guestContactUs);

//Bug report
const bugReportController = require("../controllers/bug-report");
router.post("/bug-report", bugReportController.bugReport);

//Sign up
const signUpController = require("../controllers/sign-up");
router.post("/sign-up", checkNotAuthenticated, signUpController.signUp);

module.exports = router;
