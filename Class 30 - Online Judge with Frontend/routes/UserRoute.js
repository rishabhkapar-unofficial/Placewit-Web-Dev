const router = require("express").Router();
const msgs = require("./Messages");
const questionController = require("../controllers/QuestionController");
const userController = require("../controllers/UserController");
const testcasesController = require("../controllers/TestcasesController");

router.use('/testcases', require('./TestcasesRoute').router);
router.use('/submit', require('./SubmitRoute').router);
router.use('/submissions', require('./SubmissionsRoute').router);

router.get("/", async (req, res) => {
  try {
    return res.json({
      success: true,
      message: {
        username: req.user.username,
        questions: await userController.getQuestions(req.user.username),
      },
    });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.NOT_LOGGED_IN_MSG });
  }
});

router.post("/questions", async (req, res) => {
  try {
    req.body.author = req.user.username;
    const question = await questionController.addQuestion(req.body);
    await userController.addQuestion(req.user.username, question._id);
    await testcasesController.createTestcasesEntry(question._id);
    return res.json({ success: true, message: question });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

router.put("/questions/:id", async (req, res) => {
  try {
    if (!(await userController.isAuthor(req.user.username, req.params.id)))
      return res.json({ success: false, message: msgs.NOT_AUTHORISED_MSG });
    const question = await questionController.updateQuestion(
      req.params.id,
      req.body
    );
    return res.json({ success: true, message: question });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    if (!(await userController.isAuthor(req.user.username, req.params.id)))
      return res.json({ success: false, message: msgs.NOT_AUTHORISED_MSG });
    const question = await questionController.removeQuestion(req.params.id);
    await userController.removeQuestion(req.user.username, req.params.id);
    return res.json({ success: true, message: question });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  return res.json({ success: true, message: 'Logged out successfully.'});
});

module.exports = { router };
