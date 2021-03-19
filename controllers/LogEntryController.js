const express = require('express');
const mongoose = require('mongoose');
const app = express();

const LogEntry = require('../models/LogEntry');

exports.getLogs = async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
}