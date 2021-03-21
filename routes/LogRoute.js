const express = require('express');
const { getLogs, postLogs } = require('../controllers/LogEntryController');

const router = express.Router();

router.get('/logs', getLogs);
router.post('/log', postLogs);

module.exports = router;