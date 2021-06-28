const mongoose = require('mongoose');

const TestcaseSchema = require('./TestcaseModel').TestcaseSchema;

const model_name = 'testcases';
const TestcasesSchema = new mongoose.Schema({
  
  question_id: {
    type: String,
    required: true,
    unique: true
  },

  testcases: [TestcaseSchema]

});

mongoose.model(model_name, TestcasesSchema);
module.exports = { model_name };