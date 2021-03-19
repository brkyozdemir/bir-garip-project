const express = require('express');

const LogEntryController = require('../controllers/LogEntryController');

const router = express.Router();

router.get('/logs', LogEntryController.getLogs);

module.exports = router;