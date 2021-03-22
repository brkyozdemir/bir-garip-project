const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');

exports.postSignup = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          return res.status(422).json({
            message: 'User exists'
          });
        }
      });

    return bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        res.status(201).json({
          message: 'successfully created.†',
          result: result
        });
      });
  } catch (error) {
    next(error);
  }
}

exports.postLogin = (req, res, next) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: email }).select('password')
      .then(user => {
        if (!user) {
          return res.status(422).json({
            message: 'User does not exists'
          });
        }
        
        bcrypt.compare(password, user.password)
          .then(matches => {
            if (matches) {
              const token = jwt.sign({ email: email, username: username }, process.env.JWT_SECRET);
              return res.json({
                token
              });
            }
            return res.status(422).json({
              message: 'Invalid email or password'
            });
          })
          .catch(err => {
            console.log(err);
            next();
          });
      })
      .catch(err => {
        console.log(err);
        next();
      });
  } catch (error) {
    next(error);
  }
}