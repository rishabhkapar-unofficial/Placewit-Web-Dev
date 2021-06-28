const mongoose = require("mongoose");
const User = mongoose.model(require("../models/UserModel").model_name);

const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .exec()
      .then((user) => {
        if (!user || user.password !== password) done(null, false);
        else done(null, user);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => done(null, user));
});
