const router = require("express").Router();
const testcasesController = require("../controllers/TestcasesController");
const userController = require("../controllers/UserController");
const msgs = require("./Messages");
const run = require("../code_runner/CPPRunner").run;

router.post("/:id", async (req, res) => {
  try {
    req.body.question_id = req.params.id;
    const submission = await userController.addSubmission(
      req.user.username,
      req.body
    );
    runCode(req.params.id, submission._id, req.body.code, req.user.username);
    return res.json({ success: true, message: msgs.CODE_SUBMITTED_MSG });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

async function runCode(question_id, submission_id, code, username) {
  try {
    const testcases = await testcasesController.getTestcases(question_id);
    run(testcases, code, username)
      .then((verdict) => {
        userController.setVerdict(username, submission_id, verdict);
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (e) {
    console.error(e);
  }
}

module.exports = { router };
