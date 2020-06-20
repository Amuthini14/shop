//for Authentication

const { User } = require('../models/User');

let auth = (req, res, next) => {

  //check wether the user is authenticated or not
  let token = req.cookies.a_auth;

  //call the method in User Model
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
