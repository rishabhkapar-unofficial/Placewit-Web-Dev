const router = require('express').Router();
const userController = require('../controllers/UserController');

router.get('/', async (req, res) => {
  try {
    const submissions = await userController.getSubmissions(req.user.username);
    return res.json({ success: true, message: submissions });
  } catch(e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const submission = await userController.getSubmission(req.user.username, req.params.id);
    return res.json({ success: true, message: submission });
  } catch(e) {
    console.error(e);
    return res.json({ success: false, message: msgs.INVALID_DATA_MSG });
  }
});

module.exports = { router };