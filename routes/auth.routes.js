// install npm i bcryptjs express-session connect-mongo
// merge branches - :qa is the code to let it all go through

const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  
  // verifications of firstName existence to be sent from the signup page
  if (!firstName) {
    return res.status(400).json({
      errorMessage: 'Aye but we need your first name!',
    });
  }

  // verifications of lastName existence to be sent from the signup page
  if (!lastName) {
    return res.status(400).json({
      errorMessage: 'Aye but we need your last name!',
    });
  }

  // verifications of email existence to be sent from the signup page 
  if (!email) {
    return res.status(400).json({
      errorMessage: 'Aye but we need an email for ya!',
    });
  }

  // verifications of username existence to be sent from the signup page
  if (!username) {
    return res.status(400).json({
      errorMessage: "Giv' us a username won't cha!",
    });
  }

  // backend validators for the password selection process
  if (password.length < 8) {
    return res.json({ errorMessage: "Bang Bang! that password is an easy bullseye! Do ya want the bandits on ya?" });
  }


  User.findOne({username: username }).then((foundUser) => {
    if (foundUser) {
      return res.json({
        errorMessage: "You've been had! your username is already taken!",
      });
    }

    // encrypt the password
    const saltRounds = 10;
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({ firstName, lastName, email, username, password: hashedPassword });
      })
      .then((user) => {
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((error) => {
        return res.json({
          errorMessage: `Something went wrong when creating the user. Sorry. ${error.message}`,
        });
      });
  });

  // create the user
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      errorMessage: `Hey! Did you forget something? cough cough ${
        email ? 'password' : password ? 'email and password' : 'email'
      }`,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          errorMessage: "Oy! Mate! You don't have an account!",
        });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.json({ errorMessage: 'Wrong password, mate.' });
        }
        req.session.user = user;
        return res.json(user);
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        errorMessage: `Something went wrong with the logout: ${error.message}`,
      });
    }
    res.json({ successMessage: 'Logged out!' });
  });
});

router.get('/loggedin', (req, res, next) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(403).json({ errorMessage: "You're not authenticated." });
});

module.exports = router;