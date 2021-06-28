const mongoose = require("mongoose");

const QuestionSchema = mongoose.model(
  require("../models/QuestionModel").model_name
);

async function getQuestions() {
  return await QuestionSchema.find({}).exec();
}

async function getQuestion(id) {
  return await QuestionSchema.findById(id).exec();
}

async function addQuestion(question) {
  const new_question = new QuestionSchema(question);
  return await new_question.save();
}

async function updateQuestion(id, question) {
  const keys = [
    "title",
    "problem_statement",
    "input_format",
    "output_format",
    "author",
  ];

  let new_question = await getQuestion(id);
  // keys.forEach((key) => {
  //   if (question[key]) new_question[key] = question[key];
  // });

  for (let i = 0; i < keys.length; i++) {
    if (question[keys[i]]) new_question[keys[i]] = question[keys[i]];
  }

  return await QuestionSchema.findByIdAndUpdate(id, new_question, {
    new: true,
    useFindAndModify: true,
  });
}

async function removeQuestion(id) {
  return await QuestionSchema.findByIdAndDelete(id, { useFindAndModify: true });
}

module.exports = {
  getQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  removeQuestion,
};
