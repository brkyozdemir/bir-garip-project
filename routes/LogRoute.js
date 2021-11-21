const express = require('express');
const { getLogs, postLogs } = require('../controllers/LogEntryController');

const router = express.Router();

router.get('/logs', getLogs);
router.post('/logs', postLogs);

module.exports = router;