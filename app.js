const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/weirdo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/', function (req, res) {
    res.json({
        message: 'Hello Weirdo'
    });
});

const logEntrySchema = new Schema({
    title: requiredString,
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
}, {
    timestamps: true
})

app.get('/fuko', async (req, res, next) => {
    const LogEntry = mongoose.model('LogEntry', logEntrySchema);
    try {
        const logEntry = new LogEntry({title: 'NABER'});
        const created = await logEntry.save();
        res.json(created);
    } catch (error) {
        console.log(error.name);
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

const port = 8000;
app.listen(port, () => {
    console.log('Listening at http://localhost:8000');
});