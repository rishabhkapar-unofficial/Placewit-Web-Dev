const mongoose = require("mongoose");
const { getQuestion } = require("./QuestionController");

const UserSchema = mongoose.model(require("../models/UserModel").model_name);
const SubmissionSchema = mongoose.model(
  require("../models/SubmissionModel").model_name
);

async function addUser(user) {
  return await new UserSchema(user).save();
}

async function getUser(username) {
  return await UserSchema.findOne({ username }).exec();
}

async function getQuestions(username) {
  const question_ids = (await getUser(username)).questions;
  let questions = [];

  for (let i = 0; i < question_ids.length; i++) {
    const question = await getQuestion(question_ids[i]);
    questions.push(question);
  }

  return questions;
}

async function addQuestion(username, question_id) {
  const user = await getUser(username);
  user.questions.push(question_id);
  return await user.save();
}

async function removeQuestion(username, question_id) {
  const user = await getUser(username);
  let question_ids = user.questions;

  for (let i = 0; i < question_ids.length; i++) {
    if (question_ids[i] == question_id) {
      question_ids.splice(i, 1);
      break;
    }
  }

  return user.save();
}

async function getSubmissions(username) {
  return (await getUser(username)).submissions;
}

async function getSubmission(username, submission_id) {
  const submissions = await getSubmissions(username);
  for (let i = 0; i < submissions.length; i++) {
    if (submissions[i]._id == submission_id) return submissions[i];
  }

  return null;
}

async function addSubmission(username, submission) {
  const user = await getUser(username);
  submission = new SubmissionSchema(submission);
  user.submissions.push(submission);
  await user.save();

  return submission;
}

async function setVerdict(username, submission_id, verdict) {
  const user = await getUser(username);
  const submissions = user.submissions;
  let submission = null;
  for (let i = 0; i < submissions.length; i++) {
    if (submissions[i]._id.toString() == submission_id.toString()) {
      submissions[i].verdict = verdict;
      submission = submissions[i];
      break;
    }
  }

  await user.save();
  return submission;
}

async function isAuthor(username, question_id) {
  const question_ids = (await getUser(username)).questions;
  for (let i = 0; i < question_ids.length; i++) {
    if (question_ids[i] == question_id) return true;
  }

  return false;
}

module.exports = {
  addUser,
  addQuestion,
  getQuestions,
  getUser,
  removeQuestion,
  getSubmissions,
  isAuthor,
  getSubmission,
  setVerdict,
  addSubmission,
};
