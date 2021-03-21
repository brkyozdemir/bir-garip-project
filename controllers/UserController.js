const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'birgaripsecret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized.'
    });
  }
};

exports.getDeneme = (req,res,next) => {
  try {
    res.status(418).json({
      teapot
    })
  } catch (error) {
    next(error);
  }
}

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
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(422).json({
            message: 'User does not exists'
          });
        }
        bcrypt.compare(password, user.password)
          .then(matches => {
            if (matches) {
              const token = jwt.sign({ email: email, password: password }, 'birgaripsecret');
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
          });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    next(error);
  }
}