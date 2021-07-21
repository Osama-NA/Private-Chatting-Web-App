const express = require('express');
const router = express.Router();

//Contact form from guest user
const guestContactUsController = require('../controllers/guest-contact-us');
router.post('/guest-contact-us', guestContactUsController.guestContactUs);

//Bug report
const bugReportController = require('../controllers/bug-report');
router.post('/bug-report', bugReportController.bugReport);



module.exports = router;