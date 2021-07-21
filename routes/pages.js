const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/sign-in', (req, res) => {
    res.render('sign-in');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

module.exports = router;