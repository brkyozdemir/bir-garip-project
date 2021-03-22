const LogRoutes = require('./LogRoute');
const UserRoutes = require('./UserRoute');
const BookRoutes = require('./BookRoute');

const express = require('express');
const router = express.Router();

router.use(LogRoutes);
router.use(UserRoutes);
router.use(BookRoutes);

module.exports = router;