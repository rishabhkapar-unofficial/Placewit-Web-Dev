const router = require("express").Router();
const testcasesController = require("../controllers/TestcasesController");
const userController = require("../controllers/UserController");
const msgs = require("./Messages");

router.post("/:id", async (req, res) => {
  try {
    if (!(await userController.isAuthor(req.user.username, req.params.id)))
      return res.json({ success: false, message: msgs.NOT_AUTHORISED_MSG });

    const testcase = await testcasesController.addTestcase(
      req.params.id,
      req.body
    );
    return res.json({ success: true, message: testcase });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

module.exports = { router };
