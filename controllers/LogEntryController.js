const LogEntry = require('../models/LogEntry');

exports.getLogs = async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    console.log(req);
    res.json({ entries: entries });
  } catch (error) {
    next(error);
  }
}

exports.postLogs = async (req, res, next) => {
  try {
    const title = req.body.title;
    const rating = req.body.rating;
    const mod = new LogEntry({
      title: title,
      rating: rating
    });
    await mod.save();
    res.status(201).json({ message: 'successful' });
  } catch (error) {
    next(error);
  }
}