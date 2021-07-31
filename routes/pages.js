const express = require('express');
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
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

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/sign-in', checkNotAuthenticated, (req, res) => {
    res.render('sign-in');
});

router.get('/sign-up', checkNotAuthenticated, (req, res) => {
    res.render('sign-up');
});

router.get('/signed-index', checkAuthenticated, (req, res) => {
    res.render('signed-index');
});

router.get('/sign-out', (req, res) => {
    req.logOut();
    res.redirect('/sign-in');
});

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/sign-in');
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/signed-index');
    }
    next();
}

module.exports = router;