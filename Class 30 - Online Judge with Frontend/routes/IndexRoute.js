const path = require('path');
const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const msgs = require("./Messages");

const User = mongoose.model(require("../models/UserModel").model_name);

const {
  isNotAuthenticated,
  isStringNullOrEmpty,
  isAuthenticated,
} = require("./Utilities");

router.use("/user", isAuthenticated, require("./UserRoute").router);
router.use("/questions", require("./QuestionsRoute").router);

router.post("/login", isNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err)
      return res.json({ success: false, message: msgs.INTERNAL_ERROR_MSG });
    if (!user)
      return res.json({
        success: false,
        message: msgs.INVALID_USERNAME_OR_PASSWORD_MSG,
      });

    req.logIn(user, (err) => {
      if (err)
        return res.json({ success: false, message: msgs.INTERNAL_ERROR_MSG });

      return res.json({
        success: true,
        message: msgs.SUCCESSFULLY_LOGGED_IN_MSG,
      });
    });
  })(req, res, next);
});

router.post("/register", isNotAuthenticated, (req, res) => {
  if (isStringNullOrEmpty(req.body.username) || isStringNullOrEmpty(req.body.password))
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });

  const newUser = new User(req.body);
  newUser
    .save()
    .then(() =>
      res.json({ success: true, message: msgs.SUCCESSFULLY_REGISTERED_MSG })
    )
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: msgs.USERNAME_ALREADY_EXISTS_MSG });
    });
});


// UI routes
router.get('/', isNotAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/login_register.html'));
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/dashboard.html'));
});

router.get('/myquestions', isAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/questions.html'));
});

router.get('/solve/:id', (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/code_editor.html'));
});

router.get('/addquestion', isAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/add_question.html'));
});

router.get('/addtestcase/:id', isAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/add_testcase.html'));
});

router.get('/mysubmissions', isAuthenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/html/submissions.html'));
});

module.exports = { router };
