const router = require("express").Router();

const {
  getQuestions,
  getQuestion,
} = require("../controllers/QuestionController");

router.get("/", async (req, res) => {
  try {
    return res.json({ success: true, message: await getQuestions() });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INTERNAL_ERROR_MSG });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.json({
      success: true,
      message: await getQuestion(req.params.id),
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: msgs.INTERNAL_ERROR_MSG });
  }
});

module.exports = { router };
